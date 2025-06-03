import { Inject, Injectable } from '@nestjs/common';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { CreateAttendeeFeedbackDto } from '../../models/dto/create-attendee-feedback.dto';
import { FeedbacksRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneFeedbackByAttendeeIdUseCase } from '../find-one/find-one-feedback-by-attendee-id.use-case';

@Injectable()
export class CreateAttendeeFeedbackUseCase {
	constructor(
		@Inject('FeedbacksRepositoryInterface') private readonly feedbacksRepositoryInterface: FeedbacksRepositoryInterface,
		@Inject(FindOneFeedbackByAttendeeIdUseCase) private readonly findOneFeedbackByAttendeeIdUseCase: FindOneFeedbackByAttendeeIdUseCase,
	) {}

	async execute(createAttendeeFeedbackDto: CreateAttendeeFeedbackDto) {
		await this.findOneFeedbackByAttendeeIdUseCase.execute(createAttendeeFeedbackDto.attendee_id, ThrowHandlingStrategy.THROW_IF_FOUND);

		return await this.feedbacksRepositoryInterface.createAttendeeFeedback(createAttendeeFeedbackDto);
	}
}
