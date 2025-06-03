import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { FindOneFeedbackByAttendeeIdDocs } from './docs';
import { FindOneFeedbackByAttendeeIdUseCase } from './find-one-feedback-by-attendee-id.use-case';

@ApiTags('Feedbacks')
@IsPublic()
@Controller('feedbacks')
export class FindOneFeedbackByAttendeeIdController {
	constructor(
		@Inject(FindOneFeedbackByAttendeeIdUseCase)
		private readonly findOneFeedbackByAttendeeIdUseCase: FindOneFeedbackByAttendeeIdUseCase,
	) {}
	@Get('/attendee/:attendee_id')
	@FindOneFeedbackByAttendeeIdDocs()
	async execute(@Param('attendee_id') attendee_id: string) {
		return await this.findOneFeedbackByAttendeeIdUseCase.execute(attendee_id, ThrowHandlingStrategy.THROW_NOT_FOUND);
	}
}
