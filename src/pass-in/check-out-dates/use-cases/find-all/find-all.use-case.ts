import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { CheckOutDatesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllCheckOutDatesByEventIdUseCase {
	constructor(@Inject('CheckOutDatesRepositoryInterface') private readonly checkOutDatesRepositoryInterface: CheckOutDatesRepositoryInterface) {}

	async execute(event_id: string, throw_strategy: ThrowHandlingStrategy) {
		const check_out_dates = await this.checkOutDatesRepositoryInterface.findAllByEventId(event_id);

		if (!check_out_dates && throw_strategy === ThrowHandlingStrategy.THROW_NOT_FOUND) {
			throw new NotFoundException({ message: `Nenhuma data de check-in encontrada com o id do evento: ${event_id}.` });
		}

		return check_out_dates;
	}
}
