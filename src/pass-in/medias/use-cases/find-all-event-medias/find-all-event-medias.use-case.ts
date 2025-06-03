import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { MediaPagination } from 'src/shared/utils/dto/media-pagination';
import { MediasRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllEventMediasUseCase {
	constructor(
		@Inject('MediasRepositoryInterface') private readonly mediasRepositoryInterface: MediasRepositoryInterface,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	async execute(event_id: string, { page, quantity, search, type }: MediaPagination) {
		const event = await this.findOneEventUseCase.execute(event_id);

		const [medias, count] = await this.mediasRepositoryInterface.findAllByEventId(event.id, { page, quantity, search, type });

		if (!medias) {
			throw new NotFoundException({ message: 'Nenhuma mídia encontrada.' });
		}

		const totalPages = Math.ceil(count / quantity);

		return {
			result_rows: medias,
			total_rows: {
				limit: Number(quantity),
				page: Number(page),
				totalpages: totalPages,
				totalrows: count,
			},
		};
	}
}
