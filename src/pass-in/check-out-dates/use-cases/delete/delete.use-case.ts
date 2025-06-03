import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { format } from 'date-fns';
import { FindAllCheckOutsByEventIdAndDateUseCase } from 'src/pass-in/check-outs/use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { CheckOutDatesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneCheckOutDateUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class DeleteCheckOutDateUseCase {
	constructor(
		@Inject(FindOneCheckOutDateUseCase) private readonly findOneCheckOutDate: FindOneCheckOutDateUseCase,
		@Inject(FindAllCheckOutsByEventIdAndDateUseCase) private readonly findAllCheckOutsByEventIdAndDateUseCase: FindAllCheckOutsByEventIdAndDateUseCase,
		@Inject('CheckOutDatesRepositoryInterface') private readonly checkOutDatesRepositoryInterface: CheckOutDatesRepositoryInterface,
	) {}

	async execute(id: string, event_id: string) {
		const check_out_date = await this.findOneCheckOutDate.execute(id);

		const check_outs = await this.findAllCheckOutsByEventIdAndDateUseCase.execute(event_id, check_out_date.start_date);
		if (check_outs.length > 0) {
			throw new NotAcceptableException({
				message: `Não é possível excluir a data de check-out ${format(check_outs[0].created_at, 'dd/MM/yyyy')}, pois já existem check-outs cadastrados na mesma.`,
			});
		}

		await this.checkOutDatesRepositoryInterface.delete(check_out_date.id);
	}
}
