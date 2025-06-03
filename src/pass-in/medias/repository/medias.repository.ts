import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaPagination } from 'src/shared/utils/dto/media-pagination';
import { ILike, Repository } from 'typeorm';
import { CreateMediaDto } from '../models/dto/create-media.dto';
import { RenameMediaDto } from '../models/dto/rename-media.dto';
import { Media } from '../models/entities/media.entity';
import { MediasRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class MediasRepository implements MediasRepositoryInterface {
	constructor(
		@InjectRepository(Media)
		private readonly mediasRepository: Repository<Media>,
	) {}

	async save(createMediaDto: CreateMediaDto) {
		return await this.mediasRepository.save(createMediaDto);
	}

	async findAllByEventId(event_id: string, media_pagination?: MediaPagination) {
		if (!media_pagination?.page && !media_pagination?.quantity) return await this.mediasRepository.findAndCount({ where: { event_id: event_id } });

		let { page, quantity, type, search } = media_pagination;

		page = page ?? 1;
		quantity = quantity ?? 10;

		if (type === 'all') {
			type = undefined;
		}

		return await this.mediasRepository.findAndCount({
			skip: (page - 1) * quantity,
			take: quantity,
			where: { event_id: event_id, file_name: ILike(`%${search ?? ''}%`), type: type },
			order: {
				uploaded_at: {
					direction: 'DESC',
				},
			},
		});
	}

	async findOne(media_id: string) {
		return await this.mediasRepository.findOne({ where: { id: media_id } });
	}
	async delete(media_id: string) {
		return await this.mediasRepository.delete({ id: media_id });
	}

	async renameMedia(media_id: string, { file_name }: RenameMediaDto) {
		return await this.mediasRepository.update({ id: media_id }, { file_name });
	}
}
