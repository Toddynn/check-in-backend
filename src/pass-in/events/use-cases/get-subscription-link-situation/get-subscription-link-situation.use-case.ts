import { Inject, Injectable } from '@nestjs/common';
import { isAfter } from 'date-fns';
import { FindOneEventUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class GetEventSubscriptionLinkSituationUseCase {
	constructor(@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase) {}
	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		if (isAfter(new Date(), event.end_date)) {
			return {
				status: false,
				reason: `Evento já terminou`,
				event: {
					title: event.title,
					third_party_software: event.third_party_software?.name,
					end_date: event.end_date,
				},
			};
		}

		return {
			status: true,
			reason: undefined,
		};
	}
}
