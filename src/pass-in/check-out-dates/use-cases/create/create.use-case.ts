import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { CreateCheckOutDatesDto } from '../../models/dto/create-check-out-dates.dto';
import { CheckOutDatesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class CreateCheckOutDatesUseCase {
	constructor(
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject('CheckOutDatesRepositoryInterface') private readonly checkOutDatesRepositoryInterface: CheckOutDatesRepositoryInterface,
	) {}
	async execute(createCheckOutDatesDto: CreateCheckOutDatesDto) {
		const event = await this.findOneEventUseCase.execute(createCheckOutDatesDto.event_id);

		const { start_date, end_date } = createCheckOutDatesDto;

		if (start_date < event.start_date || end_date > event.end_date) {
			throw new BadRequestException({
				message: `As datas de check out ${format(start_date, 'dd/MM/yyyy HH:mm:ss')} e ${format(end_date, 'dd/MM/yyyy HH:mm:ss')} devem estar dentro do período do evento`,
			});
		}

		if (end_date < start_date) {
			throw new BadRequestException({
				message: `A data de fechamento do check-out deve ocorrer depois da liberação do mesmo. ${format(end_date, 'dd/MM/yyyy HH:mm:ss')}`,
			});
		}

		return this.checkOutDatesRepositoryInterface.create(createCheckOutDatesDto);
	}
}
