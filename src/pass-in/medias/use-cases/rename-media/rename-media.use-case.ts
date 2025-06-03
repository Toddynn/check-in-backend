import { Inject, Injectable } from '@nestjs/common';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { RenameMediaDto } from '../../models/dto/rename-media.dto';
import { MediasRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneMediaByIdUseCase } from '../find-one-by-id/find-one-by-id.use-case';

@Injectable()
export class RenameMediaUseCase {
	constructor(
		@Inject('MediasRepositoryInterface') private readonly mediasRepositoryInterface: MediasRepositoryInterface,
		@Inject(FindOneMediaByIdUseCase) private readonly findOneMediaByIdUseCase: FindOneMediaByIdUseCase,
	) {}

	async execute(media_id: string, rename_media_dto: RenameMediaDto) {
		const media = await this.findOneMediaByIdUseCase.execute(media_id, ThrowHandlingStrategy.THROW_NOT_FOUND);

		return await this.mediasRepositoryInterface.renameMedia(media.id, rename_media_dto);
	}
}
