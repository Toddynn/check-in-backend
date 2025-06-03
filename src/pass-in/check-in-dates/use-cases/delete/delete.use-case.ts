import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { format, isSameDay } from 'date-fns';
import { FindAllCheckInsByEventIdAndDateUseCase } from 'src/pass-in/check-ins/use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { FindAllCheckOutDatesByEventIdUseCase } from 'src/pass-in/check-out-dates/use-cases/find-all/find-all.use-case';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { CheckInDatesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneCheckInDateUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class DeleteCheckInDateUseCase {
	constructor(
		@Inject('CheckInDatesRepositoryInterface') private readonly checkInDatesRepositoryInterface: CheckInDatesRepositoryInterface,
		@Inject(FindOneCheckInDateUseCase) private readonly findOneCheckInDate: FindOneCheckInDateUseCase,
		@Inject(FindAllCheckInsByEventIdAndDateUseCase) private readonly findAllCheckInsByEventIdAndDateUseCase: FindAllCheckInsByEventIdAndDateUseCase,
		@Inject(FindAllCheckOutDatesByEventIdUseCase) private readonly findAllCheckOutDatesByEventIdUseCase: FindAllCheckOutDatesByEventIdUseCase,
	) {}

	async execute(id: string, event_id: string) {
		const check_in_date = await this.findOneCheckInDate.execute(id);

		const check_ins = await this.findAllCheckInsByEventIdAndDateUseCase.execute(event_id, check_in_date.start_date);

		if (check_ins.length > 0) {
			throw new NotAcceptableException({
				message: `Não é possível excluir a data de check-in ${format(check_ins[0].created_at, 'dd/MM/yyyy')}, pois já existem check-ins cadastrados na mesma.`,
			});
		}

		const check_out_dates = await this.findAllCheckOutDatesByEventIdUseCase.execute(event_id, ThrowHandlingStrategy.IGNORE_NOT_FOUND);

		if (check_out_dates && check_out_dates.some((check_out_date) => isSameDay(check_out_date.start_date, check_in_date.start_date))) {
			throw new NotAcceptableException({
				message: `Não é possível excluir a data de check-in: ${format(check_in_date.start_date, 'dd/MM/yyyy')}, pois uma data de check-out está cadastrada nesse mesmo dia. Para prosseguir, exclua-a`,
			});
		}

		await this.checkInDatesRepositoryInterface.delete(check_in_date.id);
	}
}
