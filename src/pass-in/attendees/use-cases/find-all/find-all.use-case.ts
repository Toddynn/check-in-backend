import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllAttendeesUseCase {
	constructor(@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface) {}
	async execute(current_user: CurrentUser) {
		const Attendees = await this.attendeesRepositoryInterface.findAll(current_user);

		if (!Attendees) {
			throw new NotFoundException({ message: `Nenhum participante encontrado.` });
		}

		return Attendees;
	}
}
