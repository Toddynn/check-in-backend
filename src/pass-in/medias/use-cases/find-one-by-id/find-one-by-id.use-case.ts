import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { MediasRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneMediaByIdUseCase {
	constructor(@Inject('MediasRepositoryInterface') private readonly mediasRepositoryInterface: MediasRepositoryInterface) {}

	async execute(media_id: string, throw_strategy: ThrowHandlingStrategy) {
		const media = await this.mediasRepositoryInterface.findOne(media_id);

		if (throw_strategy === ThrowHandlingStrategy.THROW_NOT_FOUND && !media)
			throw new NotFoundException({ message: `Mídia não encontrada com o id: ${media_id}` });

		return media;
	}
}
