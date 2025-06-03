import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';

export class FindAllEventsQueryParams extends GenericPagination {
	@ApiPropertyOptional({
		description: 'third party software id',
		example: '1',
	})
	@IsString()
	@IsOptional()
	@Type(() => String)
	third_party_software_id?: string;
}
