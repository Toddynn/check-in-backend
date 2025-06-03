import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class GenericPagination {
	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	page?: number;

	@IsNumber()
	@IsOptional()
	@Type(() => Number)
	quantity?: number;

	@IsString()
	@IsOptional()
	@Type(() => String)
	search?: string;

	@IsDate()
	@IsOptional()
	@Type(() => Date)
	start_date?: Date;

	@IsBoolean()
	@IsOptional()
	@Transform(({ value }) => value === 'true')
	only_me?: boolean;
}
