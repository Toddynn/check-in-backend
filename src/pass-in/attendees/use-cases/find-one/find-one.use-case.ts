import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneAttendeeUseCase {
	constructor(@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface) {}
	async execute(id: string) {
		const attendee = await this.attendeesRepositoryInterface.findOne(id);

		if (!attendee) {
			throw new NotFoundException({
				message: 'Participante não encontrado.',
			});
		}

		return attendee;
	}
}
