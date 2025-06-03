import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { DefaultQueryParamsDocs } from 'src/shared/utils/reference-decorators/default-query-params';
import { FindAllPublicEventsDocs } from './docs';
import { FindAllPublicEventsUseCase } from './find-all-public.use-case';

@ApiTags('Events')
@Controller('events')
@IsPublic()
export class FindAllPublicEventsController {
	constructor(
		@Inject(FindAllPublicEventsUseCase)
		private readonly findAllPublicEventsUseCase: FindAllPublicEventsUseCase,
	) {}

	@Get('/paginated')
	@FindAllPublicEventsDocs()
	@DefaultQueryParamsDocs()
	async execute(@Query() query: GenericPagination) {
		return await this.findAllPublicEventsUseCase.execute(query);
	}
}
