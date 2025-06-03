import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CheckOutDatesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindOneCheckOutDateUseCase {
	constructor(@Inject('CheckOutDatesRepositoryInterface') private readonly checkOutDatesRepositoryInterface: CheckOutDatesRepositoryInterface) {}

	async execute(id: string) {
		const check_out_date = await this.checkOutDatesRepositoryInterface.findOne(id);

		if (!check_out_date) {
			throw new NotFoundException({ message: `Nenhuma data de check-in encontrada com o id: ${id}.` });
		}

		return check_out_date;
	}
}
