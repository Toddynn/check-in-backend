import { MediaPagination } from 'src/shared/utils/dto/media-pagination';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateMediaDto } from '../dto/create-media.dto';
import { RenameMediaDto } from '../dto/rename-media.dto';
import { Media } from '../entities/media.entity';

export interface MediasRepositoryInterface {
	save(createMediaDto: CreateMediaDto): Promise<Media>;
	findAllByEventId(event_id: string, media_pagination?: MediaPagination): Promise<[Media[], number]>;
	findOne(media_id: string): Promise<Media>;
	delete(media_id: string): Promise<DeleteResult>;
	renameMedia(media_id: string, rename_media_dto: RenameMediaDto): Promise<UpdateResult>;
}
