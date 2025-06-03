import { Inject, Injectable } from '@nestjs/common';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { FindOneUserByIdUseCase } from 'src/pass-in/users/use-cases/find-one-by-id/find-one-by-id.use-case';
import { handleError, ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneAttendeeByEventAndUserIdUseCase {
	constructor(
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject(FindOneUserByIdUseCase) private readonly findOneUserByIdUseCase: FindOneUserByIdUseCase,
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
	) {}
	async execute(event_id: string, user_id: string, throw_strategy: ThrowHandlingStrategy) {
		const event = await this.findOneEventUseCase.execute(event_id);

		const user = await this.findOneUserByIdUseCase.execute(user_id);

		const attendee = await this.attendeesRepositoryInterface.findOneByEventAndUserId(event.id, user.id);

		let error_message: string = '';
		if (!attendee && throw_strategy === ThrowHandlingStrategy.THROW_NOT_FOUND) {
			error_message = 'Participante não encontrado';
			handleError(throw_strategy, error_message);
		}
		if (attendee && throw_strategy === ThrowHandlingStrategy.THROW_IF_FOUND) {
			//!this message is incorrect, but not used
			error_message = 'Participante encontrado';
			handleError(throw_strategy, error_message);
		}

		return attendee;
	}
}
