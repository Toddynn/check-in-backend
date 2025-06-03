import { Inject, Injectable } from '@nestjs/common';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneAttendeeByEventIdAndNrCupomUseCase {
	constructor(@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface) {}

	async execute(event_id: string, nr_cupom: string) {
		return await this.attendeesRepositoryInterface.findOneByEventIdAndNrCupom(event_id, nr_cupom);
	}
}
