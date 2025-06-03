import { Inject, Injectable } from '@nestjs/common';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class GetTotalEventsByThirdPartySoftwareUseCase {
	constructor(
		@Inject('EventsRepositoryInterface')
		private readonly eventsRepository: EventsRepositoryInterface,
	) {}

	async execute() {
		return await this.eventsRepository.getTotalEventsByThirdPartySoftware();
	}
}
