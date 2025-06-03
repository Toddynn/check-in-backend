import { BadRequestException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { format, isSameDay } from 'date-fns';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';
import { CreateCheckInDatesUseCase } from 'src/pass-in/check-in-dates/use-cases/create/create.use-case';
import { DeleteCheckInDateUseCase } from 'src/pass-in/check-in-dates/use-cases/delete/delete.use-case';
import { UpdateCheckInDatesUseCase } from 'src/pass-in/check-in-dates/use-cases/update/update.use-case';
import { CheckOutDates } from 'src/pass-in/check-out-dates/models/entities/check-out-dates.entity';
import { CreateCheckOutDatesUseCase } from 'src/pass-in/check-out-dates/use-cases/create/create.use-case';
import { DeleteCheckOutDateUseCase } from 'src/pass-in/check-out-dates/use-cases/delete/delete.use-case';
import { UpdateCheckOutDatesUseCase } from 'src/pass-in/check-out-dates/use-cases/update/update.use-case';
import { UpdateEventDto } from 'src/pass-in/events/models/dto/update-event.dto';
import { diffEventDatesByType } from 'src/shared/utils/functions/diff-event-dates';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { DataSource } from 'typeorm';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';
import { EventWithAdditionalData, FindOneEventWithAttendeesUseCase } from '../find-one-with-attendees/find-one-with-attendees.use-case';

@Injectable()
export class UpdateEventUseCase {
	constructor(
		@Inject(DataSource) private readonly dataSource: DataSource,
		@Inject(FindOneEventWithAttendeesUseCase) private readonly findEvent: FindOneEventWithAttendeesUseCase,
		@Inject('EventsRepositoryInterface') private readonly eventsRepository: EventsRepositoryInterface,
		@Inject(CreateCheckInDatesUseCase) private readonly createCheckInDate: CreateCheckInDatesUseCase,
		@Inject(DeleteCheckInDateUseCase) private readonly deleteCheckInDate: DeleteCheckInDateUseCase,
		@Inject(CreateCheckOutDatesUseCase) private readonly createCheckOutDate: CreateCheckOutDatesUseCase,
		@Inject(DeleteCheckOutDateUseCase) private readonly deleteCheckOutDate: DeleteCheckOutDateUseCase,
		@Inject(UpdateCheckInDatesUseCase) private readonly updateCheckInDate: UpdateCheckInDatesUseCase,
		@Inject(UpdateCheckOutDatesUseCase) private readonly updateCheckOutDate: UpdateCheckOutDatesUseCase,
	) {}

	async execute(event_id: string, dto: UpdateEventDto, current_user: CurrentUser) {
		const event = await this.findEvent.execute(event_id);

		await ensureIsCreatorOrResponsibleOfEvent({
			event: { created_by_login_id: event.created_by_login_id, responsible_login_ids: event.responsible_login_ids },
			current_user,
			throw_message: 'Somente o criador ou responsável do evento pode editá-lo.',
		});

		if (!dto.check_in_dates || dto.check_in_dates?.length <= 0)
			throw new NotAcceptableException({ message: 'Não é possível deixar um evento sem datas de check in' });

		const runner = this.dataSource.createQueryRunner();
		await runner.connect();
		await runner.startTransaction();

		try {
			const checkInDiff = diffEventDatesByType(event.check_in_dates || [], dto.check_in_dates || []);
			const checkOutDiff = diffEventDatesByType(event.check_out_dates || [], dto.check_out_dates || []);

			this.validateCheckOutAdditions(dto.check_in_dates, checkOutDiff.added);

			this.validateCheckOutRemovals(event.dates_with_check_outs, checkOutDiff.removed);
			this.validateCheckInRemovals(
				{
					dates_with_check_ins: event.dates_with_check_ins,
					dates_with_check_outs: event.dates_with_check_outs,
					check_out_dates: event.check_out_dates,
				},
				checkInDiff.removed,
			);

			for (const date of checkOutDiff.removed) {
				await this.deleteCheckOutDate.execute(date.id, event.id);
			}
			for (const date of checkInDiff.removed) {
				await this.deleteCheckInDate.execute(date.id, event.id);
			}
			for (const date of checkInDiff.updated) {
				await this.updateCheckInDate.execute(date.id, event_id, {
					start_date: date.start_date,
					end_date: date.end_date,
				});
			}
			for (const date of checkInDiff.added) {
				await this.createCheckInDate.execute({ event_id, start_date: date.start_date, end_date: date.end_date });
			}
			for (const date of checkOutDiff.added) {
				await this.createCheckOutDate.execute({ event_id, start_date: date.start_date, end_date: date.end_date });
			}
			for (const date of checkOutDiff.updated) {
				await this.updateCheckOutDate.execute(date.id, event_id, {
					start_date: date.start_date,
					end_date: date.end_date,
				});
			}

			await this.eventsRepository.update(event_id, dto);

			await runner.commitTransaction();
		} catch (err) {
			await runner.rollbackTransaction();
			throw err;
		} finally {
			await runner.release();
		}
	}

	private validateCheckOutRemovals(dates_with_check_outs: EventWithAdditionalData['dates_with_check_outs'], removed: Array<CheckOutDates>) {
		for (const date of removed) {
			const hadCheckOut = dates_with_check_outs?.some((d) => isSameDay(new Date(d), new Date(date.start_date)));
			if (hadCheckOut) {
				throw new BadRequestException(
					`A data de check-out ${format(new Date(date.start_date), 'dd/MM/yyyy')} não pode ser removida, pois há registros de participantes.`,
				);
			}
		}
	}

	private validateCheckInRemovals(
		{
			check_out_dates,
			dates_with_check_ins,
			dates_with_check_outs,
		}: Pick<EventWithAdditionalData, 'dates_with_check_ins' | 'dates_with_check_outs' | 'check_out_dates'>,
		removed: Array<CheckInDates>,
	) {
		for (const date of removed) {
			const hasCheckIn = dates_with_check_ins?.some((d) => isSameDay(new Date(d), new Date(date.start_date)));
			const hasCheckOut = check_out_dates?.some((d) => isSameDay(new Date(d.start_date), new Date(date.start_date)));
			const hasCheckOutPeople = dates_with_check_outs?.some((d) => isSameDay(new Date(d), new Date(date.start_date)));

			if (hasCheckIn || (hasCheckOut && hasCheckOutPeople)) {
				throw new BadRequestException(
					`A data de check-in ${format(new Date(date.start_date), 'dd/MM/yyyy')} não pode ser removida, pois há check-ins ou check-outs relacionados.`,
				);
			}
		}
	}

	private validateCheckOutAdditions(allCheckInDates: Array<CheckInDates>, addedCheckOutDates: Array<CheckOutDates>) {
		const checkInSet = new Set(allCheckInDates.map((d) => new Date(d.start_date).toDateString()));
		for (const date of addedCheckOutDates) {
			const dateStr = new Date(date.start_date).toDateString();
			if (!checkInSet.has(dateStr)) {
				throw new BadRequestException(
					`Não é possível adicionar check-out para ${format(new Date(date.start_date), 'dd/MM/yyyy')} sem uma data de check-in correspondente.`,
				);
			}
		}
	}
}
