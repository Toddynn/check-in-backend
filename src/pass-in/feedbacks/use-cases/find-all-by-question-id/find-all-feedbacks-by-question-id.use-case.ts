import { Inject, Injectable } from '@nestjs/common';
import { FeedbacksRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllFeedbacksByQuestionIdUseCase {
	constructor(@Inject('FeedbacksRepositoryInterface') private readonly feedbacksRepositoryInterface: FeedbacksRepositoryInterface) {}

	async execute(question_id: string) {
		return await this.feedbacksRepositoryInterface.findAllByQuestionId(question_id);
	}
}
