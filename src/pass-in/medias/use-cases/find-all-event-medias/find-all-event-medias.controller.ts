import { Controller, Get, Inject, Param, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { MediaUrlInterceptor } from 'src/interceptors/media-url.interceptor';
import { MediaPagination } from 'src/shared/utils/dto/media-pagination';
import { DefaultQueryParamsDocs } from 'src/shared/utils/reference-decorators/default-query-params';
import { FindAllEventMediasDocs } from './docs';
import { FindAllEventMediasUseCase } from './find-all-event-medias.use-case';

@ApiTags('Medias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class FindAllEventMediasController {
	constructor(
		@Inject(FindAllEventMediasUseCase)
		private readonly findAllEventMediasUseCase: FindAllEventMediasUseCase,
	) {}

	@Get('/event/:event_id')
	@UseInterceptors(MediaUrlInterceptor)
	@FindAllEventMediasDocs()
	@DefaultQueryParamsDocs()
	async execute(@Param('event_id') event_id: string, @Query() query: MediaPagination) {
		return await this.findAllEventMediasUseCase.execute(event_id, query);
	}
}
