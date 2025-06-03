import { Inject, Injectable } from '@nestjs/common';
import { CheckInsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneCheckInUseCase {
	constructor(@Inject('CheckInsRepositoryInterface') private readonly checkInsRepositoryInterface: CheckInsRepositoryInterface) {}
	async execute(attendee_id: string) {
		const check_in = await this.checkInsRepositoryInterface.findOne(attendee_id);

		if (!check_in) return;

		return check_in;
	}
}
