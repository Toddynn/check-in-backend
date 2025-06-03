import { Controller, Get, Inject, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { DefaultQueryParamsDocs } from 'src/shared/utils/reference-decorators/default-query-params';
import { FindAllFeedbacksByEventIdAndAttendeeDocs } from './docs';
import { FindAllFeedbacksByEventIdAndAttendeeUseCase } from './find-all-feedbacks-by-event-id-and-attendee.use-case';

@ApiTags('Feedbacks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedbacks')
export class FindAllFeedbacksByEventIdAndAttendeeController {
	constructor(
		@Inject(FindAllFeedbacksByEventIdAndAttendeeUseCase)
		private readonly findAllFeedbacksByEventIdAndAttendeeUseCase: FindAllFeedbacksByEventIdAndAttendeeUseCase,
	) {}

	@Get('/:event_id/attendees')
	@FindAllFeedbacksByEventIdAndAttendeeDocs()
	@DefaultQueryParamsDocs()
	async execute(@Param('event_id') event_id: string, @Query() query: GenericPagination) {
		return await this.findAllFeedbacksByEventIdAndAttendeeUseCase.execute(event_id, query);
	}
}
