import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { UpdateFeedbackQuestionDto } from '../../models/dto/update-feedback-question.dto';
import { Injectable, Inject } from '@nestjs/common';
import { FeedbackQuestionsRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneFeedbackQuestionUseCase } from '../find-one/find-one-feedback-question.use-case';

@Injectable()
export class UpdateFeedbackQuestionUseCase {
	constructor(
		@Inject(FindOneFeedbackQuestionUseCase) private readonly findOneFeedbackQuestionUseCase: FindOneFeedbackQuestionUseCase,
		@Inject('FeedbackQuestionsRepositoryInterface') private readonly feedbackQuestionsRepository: FeedbackQuestionsRepositoryInterface,
	) {}

	async execute(feedback_question_id: string, update_feedback_question_dto: UpdateFeedbackQuestionDto) {
		const feedback_question = await this.findOneFeedbackQuestionUseCase.execute(feedback_question_id, ThrowHandlingStrategy.THROW_NOT_FOUND);

		return await this.feedbackQuestionsRepository.update(feedback_question.id, update_feedback_question_dto);
	}
}
