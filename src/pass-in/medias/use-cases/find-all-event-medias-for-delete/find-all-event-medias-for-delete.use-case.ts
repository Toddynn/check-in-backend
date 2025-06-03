import { Inject, Injectable } from '@nestjs/common';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { MediasRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class FindAllEventMediasForDeleteUseCase {
	constructor(
		@Inject('MediasRepositoryInterface') private readonly mediasRepositoryInterface: MediasRepositoryInterface,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		return await this.mediasRepositoryInterface.findAllByEventId(event.id);
	}
}
