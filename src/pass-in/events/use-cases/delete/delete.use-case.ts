import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { promises } from 'fs';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { DeleteCheckInDateUseCase } from 'src/pass-in/check-in-dates/use-cases/delete/delete.use-case';
import { DeleteCheckOutDateUseCase } from 'src/pass-in/check-out-dates/use-cases/delete/delete.use-case';
import { FindAllEventMediasForDeleteUseCase } from 'src/pass-in/medias/use-cases/find-all-event-medias-for-delete/find-all-event-medias-for-delete.use-case';
import { roles } from 'src/shared/utils/constants/roles';
import { DataSource } from 'typeorm';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneEventWithAttendeesUseCase } from '../find-one-with-attendees/find-one-with-attendees.use-case';

@Injectable()
export class DeleteEventUseCase {
	constructor(
		@Inject(DataSource) private readonly dataSource: DataSource,
		@Inject(FindOneEventWithAttendeesUseCase) private readonly findOneEventWithAttendeesUseCase: FindOneEventWithAttendeesUseCase,
		@Inject(DeleteCheckInDateUseCase) private readonly deleteCheckInDateUseCase: DeleteCheckInDateUseCase,
		@Inject(DeleteCheckOutDateUseCase) private readonly deleteCheckOutDateUseCase: DeleteCheckOutDateUseCase,
		@Inject(FindAllEventMediasForDeleteUseCase) private readonly findAllEventMediasForDeleteUseCase: FindAllEventMediasForDeleteUseCase,
		@Inject('EventsRepositoryInterface') private readonly eventsRepositoryInterface: EventsRepositoryInterface,
	) {}

	async execute(event_id: string, current_user: CurrentUser) {
		const event = await this.findOneEventWithAttendeesUseCase.execute(event_id);
		const [medias] = await this.findAllEventMediasForDeleteUseCase.execute(event_id);

		if (Number(event.created_by_login_id) !== Number(current_user.user.loginId) && !current_user.user.roles.includes(roles.master)) {
			throw new NotAcceptableException({ message: `Somente o criador do evento pode excluí-lo` });
		}

		if (event.attendees.length > 0) {
			throw new NotAcceptableException({
				message: `Não foi possível cancelar o evento: "${event.title}", pois já existem participantes cadastrados. Entre em contato com a administração.`,
			});
		}

		if (event.dates_with_check_ins.length > 0 || event.dates_with_check_outs.length > 0) {
			throw new NotAcceptableException({
				message: `Não foi possível cancelar o evento: "${event.title}", pois já existem confirmações de presença. Entre em contato com a administração.`,
			});
		}

		const runner = this.dataSource.createQueryRunner();
		await runner.connect();
		await runner.startTransaction();

		try {
			for (const checkOut of event.check_out_dates) {
				await this.deleteCheckOutDateUseCase.execute(checkOut.id, event_id);
			}
			for (const checkIn of event.check_in_dates) {
				await this.deleteCheckInDateUseCase.execute(checkIn.id, event_id);
			}

			await Promise.all(
				medias.map((media) =>
					promises.unlink(media.path).catch((err) => {
						console.error(`Erro ao deletar a mídia ${media.path}:`, err);
					}),
				),
			);

			await this.eventsRepositoryInterface.delete(event_id);

			await runner.commitTransaction();
		} catch (err) {
			await runner.rollbackTransaction();
			throw err;
		} finally {
			await runner.release();
		}
	}
}
