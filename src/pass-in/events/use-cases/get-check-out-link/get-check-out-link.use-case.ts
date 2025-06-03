import { Inject, Injectable } from '@nestjs/common';
import { FindOneEventUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class GetEventCheckOutLinkUseCase {
	constructor(@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase) {}
	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		return { link: `${process.env.BASE_URL}/Event/${event.id}/check-out` };
	}
}
