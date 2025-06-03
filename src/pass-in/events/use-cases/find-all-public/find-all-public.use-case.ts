import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { getEventStatus } from 'src/shared/utils/functions/get-event-status';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllPublicEventsUseCase {
	constructor(@Inject('EventsRepositoryInterface') private readonly eventsRepositoryInterface: EventsRepositoryInterface) {}
	async execute({ page, quantity, search }: GenericPagination) {
		const [events, count] = await this.eventsRepositoryInterface.findAllPublic({ page, quantity, search });

		if (!events) {
			throw new NotFoundException({ message: 'Nenhum evento encontrado.' });
		}

		const totalPages = Math.ceil(count / quantity);

		const eventsWithStatus =
			events &&
			events.map((event: Event) => {
				const status = getEventStatus(event.start_date, event.end_date);
				return {
					...event,
					status: status,
				};
			});

		return {
			result_rows: eventsWithStatus,
			total_rows: {
				limit: Number(quantity),
				page: Number(page),
				totalpages: totalPages,
				totalrows: count,
			},
		};
	}
}
