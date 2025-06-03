import { Inject, Injectable } from '@nestjs/common';
import { handleError, ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { FeedbackQuestionsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneFeedbackQuestionUseCase {
	constructor(@Inject('FeedbackQuestionsRepositoryInterface') private readonly feedbackQuestionsRepository: FeedbackQuestionsRepositoryInterface) {}

	async execute(feedback_question_id: string, throw_strategy?: ThrowHandlingStrategy) {
		const feedback_question = await this.feedbackQuestionsRepository.findOne(feedback_question_id);

		let error_message: string = '';
		if (!feedback_question && throw_strategy === ThrowHandlingStrategy.IGNORE_NOT_FOUND) {
			return feedback_question;
		} else if (!feedback_question && throw_strategy === ThrowHandlingStrategy.THROW_NOT_FOUND) {
			error_message = 'Pergunta de feedback não encontrada';
			handleError(throw_strategy, error_message);
		}

		return feedback_question;
	}
}
