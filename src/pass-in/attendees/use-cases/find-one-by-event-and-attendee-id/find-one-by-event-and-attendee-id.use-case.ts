import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneAttendeeUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class FindOneAttendeeByEventAndAttendeeIdUseCase {
	constructor(
		@Inject(FindOneAttendeeUseCase) private readonly findOneAttendeeUseCase: FindOneAttendeeUseCase,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
	) {}
	async execute(event_id: string, attendee_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		const attendee = await this.findOneAttendeeUseCase.execute(attendee_id);

		const attendee_of_event = await this.attendeesRepositoryInterface.findOneByEventAndAttendeeId(event.id, attendee.id);

		if (!attendee_of_event) {
			throw new NotFoundException({ message: `Participante ${attendee.user.name} não cadastrado nesse evento.` });
		}

		return attendee_of_event;
	}
}
