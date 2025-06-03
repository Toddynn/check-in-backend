import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { DefaultQueryParamsDocs } from 'src/shared/utils/reference-decorators/default-query-params';
import { FindAllFeedbacksByEventIdAndAdminDocs } from './docs';
import { FindAllFeedbacksByEventIdAndAdminUseCase } from './find-all-feedbacks-by-event-id-and-admin.use-case';

@ApiTags('Feedbacks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedbacks')
export class FindAllFeedbacksByEventIdAndAdminController {
	constructor(
		@Inject(FindAllFeedbacksByEventIdAndAdminUseCase)
		private readonly findAllFeedbacksByEventIdAndAdminUseCase: FindAllFeedbacksByEventIdAndAdminUseCase,
	) {}

	@Get('/:event_id')
	@FindAllFeedbacksByEventIdAndAdminDocs()
	@DefaultQueryParamsDocs()
	async execute(@Param('event_id') event_id: string, @Query() query: GenericPagination) {
		return await this.findAllFeedbacksByEventIdAndAdminUseCase.execute(event_id, query);
	}
}
