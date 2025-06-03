import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CheckInDatesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneCheckInDateUseCase {
	constructor(@Inject('CheckInDatesRepositoryInterface') private readonly checkInDatesRepositoryInterface: CheckInDatesRepositoryInterface) {}

	async execute(id: string) {
		const check_in_date = await this.checkInDatesRepositoryInterface.findOne(id);

		if (!check_in_date) {
			throw new NotFoundException({ message: `Nenhuma data de check-in encontrada com o id: ${id}.` });
		}

		return check_in_date;
	}
}
