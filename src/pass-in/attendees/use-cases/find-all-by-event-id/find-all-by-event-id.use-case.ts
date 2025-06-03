import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllAttendeesByEventIdUseCase {
	constructor(
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}
	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		const attendees = await this.attendeesRepositoryInterface.findAllByEventId(event.id);

		if (!attendees) {
			throw new NotFoundException({ message: `Nenhum participante encontrado no evento ${event.title}.` });
		}

		return attendees;
	}
}
