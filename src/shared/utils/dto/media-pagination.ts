import { IsIn, IsOptional, IsString } from 'class-validator';
import { GenericPagination } from './generic-pagination';

export class MediaPagination extends GenericPagination {
	@IsOptional()
	@IsString()
	@IsIn(['image', 'video', 'all'])
	type?: string;
}
