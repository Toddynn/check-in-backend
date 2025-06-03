import { Inject, Injectable } from '@nestjs/common';
import { FindOneAttendeeUseCase } from 'src/pass-in/attendees/use-cases/find-one/find-one.use-case';
import { ThrowHandlingStrategy, handleError } from 'src/shared/utils/functions/handle-error';
import { FeedbacksRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneFeedbackByAttendeeIdUseCase {
	constructor(
		@Inject('FeedbacksRepositoryInterface') private readonly feedbacksRepositoryInterface: FeedbacksRepositoryInterface,
		@Inject(FindOneAttendeeUseCase) private readonly findOneAttendeeUseCase: FindOneAttendeeUseCase,
	) {}

	async execute(attendee_id: string, throw_strategy: ThrowHandlingStrategy) {
		await this.findOneAttendeeUseCase.execute(attendee_id);

		const feedback = await this.feedbacksRepositoryInterface.findOneByAttendeeId(attendee_id);

		if (!feedback && throw_strategy === ThrowHandlingStrategy.THROW_NOT_FOUND) {
			handleError(throw_strategy, 'Feedback não encontrado!');
		}
		if (feedback && throw_strategy === ThrowHandlingStrategy.THROW_IF_FOUND) {
			handleError(throw_strategy, 'Participante já deu um feedback!');
		}

		return feedback;
	}
}
