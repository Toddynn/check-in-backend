import { HttpException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { endOfDay, startOfDay } from 'date-fns';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateCheckInDatesUseCase } from 'src/pass-in/check-in-dates/use-cases/create/create.use-case';
import { CreateCheckOutDatesUseCase } from 'src/pass-in/check-out-dates/use-cases/create/create.use-case';
import { FindOneThirdPartySoftwareUseCase } from 'src/pass-in/third-party-softwares/use-cases/find-one/find-one-third-party-software.use-case';
import { validateCheckInDates } from 'src/shared/utils/functions/validate-invalid-check-in-dates';
import { validateCheckOutDates } from 'src/shared/utils/functions/validate-invalid-check-out-dates';
import { DataSource } from 'typeorm';
import { CreateEventDto } from '../../models/dto/create-event.dto';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class CreateEventUseCase {
	constructor(
		@Inject(DataSource) private readonly dataSource: DataSource,
		@Inject(CreateCheckInDatesUseCase) private readonly createCheckInDatesUseCase: CreateCheckInDatesUseCase,
		@Inject(CreateCheckOutDatesUseCase) private readonly createCheckOutDatesUseCase: CreateCheckOutDatesUseCase,
		@Inject(FindOneThirdPartySoftwareUseCase) private readonly findOneThirdPartySoftwareUseCase: FindOneThirdPartySoftwareUseCase,
		@Inject('EventsRepositoryInterface') private readonly eventsRepositoryInterface: EventsRepositoryInterface,
	) {}

	async execute(createEventDto: CreateEventDto, current_user: CurrentUser) {
		const start_date = startOfDay(createEventDto.start_date);
		const end_date = endOfDay(createEventDto.end_date);

		if (createEventDto.check_in_dates.length <= 0)
			throw new NotAcceptableException({ message: 'Não é possível criar um evento sem exigir datas de check in' });

		await Promise.all([
			validateCheckInDates({
				start_date,
				end_date,
				check_in_dates: createEventDto.check_in_dates,
			}),
			validateCheckOutDates({
				start_date,
				end_date,
				check_in_dates: createEventDto.check_in_dates,
				check_out_dates: createEventDto.check_out_dates,
			}),
		]);

		if (createEventDto.third_party_software_id) {
			await this.findOneThirdPartySoftwareUseCase.execute(createEventDto.third_party_software_id);
		}

		const { check_in_dates, check_out_dates, maximum_attendees, ...eventPayload } = createEventDto;

		const runner = this.dataSource.createQueryRunner();
		await runner.connect();
		await runner.startTransaction();

		try {
			const event = await this.eventsRepositoryInterface.create(
				{
					...eventPayload,
					start_date,
					end_date,
					maximum_attendees: maximum_attendees === 0 ? null : maximum_attendees,
				},
				current_user,
			);

			for (const date of check_in_dates) {
				await this.createCheckInDatesUseCase.execute({
					event_id: event.id,
					start_date: date.start_date,
					end_date: date.end_date,
				});
			}

			if (check_out_dates?.length > 0) {
				for (const date of check_out_dates) {
					await this.createCheckOutDatesUseCase.execute({
						event_id: event.id,
						start_date: date.start_date,
						end_date: date.end_date,
					});
				}
			}

			await runner.commitTransaction();
			return event;
		} catch (error) {
			await runner.rollbackTransaction();
			throw new HttpException(error.message, error.status);
		} finally {
			await runner.release();
		}
	}
}
