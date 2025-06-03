import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { FeedbacksRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllFeedbacksByEventIdAndAttendeeUseCase {
	constructor(@Inject('FeedbacksRepositoryInterface') private readonly feedbacksRepositoryInterface: FeedbacksRepositoryInterface) {}

	async execute(event_id: string, { page, quantity }: GenericPagination) {
		page = page ?? 1;
		quantity = quantity ?? 10;

		if (!event_id) {
			throw new BadRequestException('Event ID is required.');
		}

		const [feedbacks, count] = await this.feedbacksRepositoryInterface.findAllByEventIdAndAttendee(event_id, { page, quantity });

		if (!feedbacks) {
			throw new NotFoundException({ message: 'Nenhum Feedback encontrado.' });
		}

		const totalPages = Math.ceil(count / quantity);

		return {
			result_rows: feedbacks,
			total_rows: {
				limit: Number(quantity),
				page: Number(page),
				totalpages: totalPages,
				totalrows: count,
			},
		};
	}
}
