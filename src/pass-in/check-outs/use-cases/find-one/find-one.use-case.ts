import { Inject, Injectable } from '@nestjs/common';
import { CheckOutsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneCheckOutUseCase {
	constructor(@Inject('CheckOutsRepositoryInterface') private readonly checkOutsRepositoryInterface: CheckOutsRepositoryInterface) {}
	async execute(attendee_id: string) {
		const check_out = await this.checkOutsRepositoryInterface.findOne(attendee_id);

		if (!check_out) return;

		return check_out;
	}
}
