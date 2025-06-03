import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateFeedbackQuestionDto } from '../../models/dto/create-feedback-question.dto';
import { CreateFeedbackQuestionUseCase } from './create-feedback-question.use-case';
import { CreateFeedbackQuestionDocs } from './docs';

@ApiTags('Feedback Questions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('feedback-question')
export class CreateFeedbackQuestionController {
	constructor(
		@Inject(CreateFeedbackQuestionUseCase)
		private readonly createFeedbackQuestionUseCase: CreateFeedbackQuestionUseCase,
	) {}

	@Post()
	@CreateFeedbackQuestionDocs()
	async execute(@Body() createFeedbackQuestionDto: CreateFeedbackQuestionDto, @GetCurrentUser() current_user: CurrentUser) {
		return await this.createFeedbackQuestionUseCase.execute(createFeedbackQuestionDto, current_user);
	}
}
