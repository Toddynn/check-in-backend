import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { event_status, getEventStatus } from 'src/shared/utils/functions/get-event-status';
import { FindAllEventsQueryParams } from '../../models/dto/find-all-events.dto';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllEventsUseCase {
	constructor(@Inject('EventsRepositoryInterface') private readonly eventsRepositoryInterface: EventsRepositoryInterface) {}
	async execute(query: FindAllEventsQueryParams, current_user: CurrentUser) {
		const result = await this.eventsRepositoryInterface.findAll(query, current_user);

		if (!result) {
			throw new NotFoundException({ message: `Nenhum evento encontrado.` });
		}

		// Atualiza o status de cada evento
		const updatedResultRows = result.result_rows.map((event) => ({
			...event,
			status: getEventStatus(event.start_date, event.end_date),
		}));

		// Calcula a contagem por status
		const scheduled_events_length = updatedResultRows.filter((event) => event.status === event_status.scheduled).length;
		const in_progress_events_length = updatedResultRows.filter((event) => event.status === event_status.progress).length;
		const finished_events_length = updatedResultRows.filter((event) => event.status === event_status.finished).length;

		return {
			...result,
			result_rows: updatedResultRows,
			status_counts: {
				scheduled: scheduled_events_length,
				in_progress: in_progress_events_length,
				finished: finished_events_length,
			},
		};
	}
}
