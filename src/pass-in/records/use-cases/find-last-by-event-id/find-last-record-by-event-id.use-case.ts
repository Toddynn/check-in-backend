import { Inject, Injectable } from '@nestjs/common';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { RecordsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindLastRecordByEventIdUseCase {
	constructor(
		@Inject('RecordsRepositoryInterface') private readonly recordsRepositoryInterface: RecordsRepositoryInterface,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		return await this.recordsRepositoryInterface.findLastRecordByEventId(event.id);
	}
}
