import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { UpdateFeedbackQuestionDto } from '../../models/dto/update-feedback-question.dto';
import { UpdateFeedbackQuestionDocs } from './docs';
import { UpdateFeedbackQuestionUseCase } from './update-feedback-question.use-case';

@ApiTags('Feedback Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedback-question')
export class UpdateFeedbackQuestionController {
	constructor(
		@Inject(UpdateFeedbackQuestionUseCase)
		private readonly updateFeedbackQuestionUseCase: UpdateFeedbackQuestionUseCase,
	) {}

	@Patch('/:id')
	@HttpCode(HttpStatus.OK)
	@UpdateFeedbackQuestionDocs()
	async execute(@Param('id') id: string, @Body() update_feedback_question_dto: UpdateFeedbackQuestionDto) {
		return await this.updateFeedbackQuestionUseCase.execute(id, update_feedback_question_dto);
	}
}
