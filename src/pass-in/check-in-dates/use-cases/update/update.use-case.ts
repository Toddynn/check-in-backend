import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { UpdateCheckInDatesDto } from '../../models/dto/update-check-in-dates.dto';
import { CheckInDatesRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class UpdateCheckInDatesUseCase {
	constructor(
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject('CheckInDatesRepositoryInterface') private readonly checkInDatesRepositoryInterface: CheckInDatesRepositoryInterface,
	) {}
	async execute(id: string, event_id: string, updateCheckInDatesDto: UpdateCheckInDatesDto) {
		const event = await this.findOneEventUseCase.execute(event_id);

		const { start_date, end_date } = updateCheckInDatesDto;

		if (start_date < event.start_date || end_date > event.end_date) {
			throw new BadRequestException({
				message: `As datas de check in ${format(start_date, 'dd/MM/yyyy HH:mm:ss')} e ${format(end_date, 'dd/MM/yyyy HH:mm:ss')} devem estar dentro do período do evento`,
			});
		}

		if (end_date < start_date) {
			throw new BadRequestException({
				message: `A data de fechamento do check-in deve ocorrer depois da liberação do mesmo. ${format(end_date, 'dd/MM/yyyy HH:mm:ss')}`,
			});
		}

		await this.checkInDatesRepositoryInterface.update(id, updateCheckInDatesDto);
	}
}
