import { Controller, Delete, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { DeleteFeedbackQuestionUseCase } from './delete-feedback-question.use-case';
import { DeleteFeedbackQuestionDocs } from './docs';

@ApiTags('Feedback Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedback-question')
export class DeleteFeedbackQuestionController {
	constructor(
		@Inject(DeleteFeedbackQuestionUseCase)
		private readonly deleteFeedbackQuestionUseCase: DeleteFeedbackQuestionUseCase,
	) {}

	@Delete('/:id')
	@DeleteFeedbackQuestionDocs()
	async execute(@Param('id') id: string) {
		return await this.deleteFeedbackQuestionUseCase.execute(id);
	}
}
