import { Inject, Injectable } from '@nestjs/common';
import { isSameDay } from 'date-fns';
import { FindAllAttendeesByEventIdUseCase } from 'src/pass-in/attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';

@Injectable()
export class FindAllCheckOutsByEventIdAndDateUseCase {
	constructor(@Inject(FindAllAttendeesByEventIdUseCase) private readonly findAllAttendeesByEventIdUseCase: FindAllAttendeesByEventIdUseCase) {}
	async execute(event_id: string, date: Date) {
		const attendees = await this.findAllAttendeesByEventIdUseCase.execute(event_id);

		let result = [];
		for (const attendee of attendees) {
			for (const check_out of attendee.check_out) {
				if (isSameDay(date, check_out.created_at)) {
					result.push(check_out);
				}
				break;
			}
		}

		return result;
	}
}
