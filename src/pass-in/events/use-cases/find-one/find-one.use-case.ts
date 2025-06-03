import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindAllAdminUsersUseCase } from 'src/pass-in/users/use-cases/find-all-admins/find-all-admin-users.use-case';
import { getEventStatus } from 'src/shared/utils/functions/get-event-status';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneEventUseCase {
	constructor(
		@Inject('EventsRepositoryInterface') private readonly eventsRepositoryInterface: EventsRepositoryInterface,
		@Inject(FindAllAdminUsersUseCase) private readonly findAllAdminUsersUseCase: FindAllAdminUsersUseCase,
	) {}
	async execute(event_id: string, current_user?: CurrentUser) {
		const event = await this.eventsRepositoryInterface.findOne(event_id);

		if (!event) {
			throw new NotFoundException({ message: `Nenhum evento encontrado com o id: ${event_id}.` });
		}

		const status = getEventStatus(event.start_date, event.end_date);

		const responsibles =
			event.responsible_login_ids && event.responsible_login_ids?.length > 0 && current_user
				? await this.getEventResponsibles(event.responsible_login_ids)
				: undefined;

		return {
			...event,
			status,
			responsibles,
		};
	}

	private async getEventResponsibles(responsibles_ids: string[]) {
		const result_rows = await this.findAllAdminUsersUseCase.execute();

		const admins = [];
		for (const admin of result_rows) {
			if (responsibles_ids.includes(String(admin.login.id))) {
				admins.push(admin);
			}
		}
		return admins;
	}
}
