import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { FindAllFeedbacksByQuestionIdUseCase } from 'src/pass-in/feedbacks/use-cases/find-all-by-question-id/find-all-feedbacks-by-question-id.use-case';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { FeedbackQuestionsRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneFeedbackQuestionUseCase } from '../find-one/find-one-feedback-question.use-case';

@Injectable()
export class DeleteFeedbackQuestionUseCase {
	constructor(
		@Inject(FindOneFeedbackQuestionUseCase) private readonly findOneFeedbackQuestionUseCase: FindOneFeedbackQuestionUseCase,
		@Inject(FindAllFeedbacksByQuestionIdUseCase) private readonly findAllFeedbacksByQuestionIdUseCase: FindAllFeedbacksByQuestionIdUseCase,
		@Inject('FeedbackQuestionsRepositoryInterface') private readonly feedbackQuestionsRepository: FeedbackQuestionsRepositoryInterface,
	) {}

	async execute(feedback_question_id: string) {
		const feedback_question = await this.findOneFeedbackQuestionUseCase.execute(feedback_question_id, ThrowHandlingStrategy.THROW_NOT_FOUND);

		const [_, count] = await this.findAllFeedbacksByQuestionIdUseCase.execute(feedback_question_id);

		if (count > 0) {
			throw new NotAcceptableException({
				message: `Há ${count} ${count === 1 ? 'feedback associado' : 'feedbacks associados'} a essa pergunta. Não é possível excluir uma pergunta com feedbacks associados.`,
			});
		}

		return await this.feedbackQuestionsRepository.delete(feedback_question.id);
	}
}
