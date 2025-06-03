import { Inject, Injectable } from '@nestjs/common';
import { FindAllAttendeesByEventIdUseCase } from 'src/pass-in/attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { FindOneEventUseCase } from '../find-one/find-one.use-case';

export interface EventWithAdditionalData extends Event {
	dates_with_check_ins: Date[];
	dates_with_check_outs: Date[];
}

@Injectable()
export class FindOneEventWithAttendeesUseCase {
	constructor(
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject(FindAllAttendeesByEventIdUseCase) private readonly findAllAttendeesByEventIdUseCase: FindAllAttendeesByEventIdUseCase,
	) {}
	async execute(event_id: string): Promise<Partial<EventWithAdditionalData>> {
		const event = await this.findOneEventUseCase.execute(event_id);

		const attendees = await this.findAllAttendeesByEventIdUseCase.execute(event.id);

		const arrayDatesWithCheckin = [];
		const arrayDatesWithCheckout = [];

		attendees.map((attendee) => {
			if (attendee.check_in) {
				attendee.check_in.map((check_in) => {
					arrayDatesWithCheckin.push(check_in.created_at);
				});
			}
			if (attendee.check_out) {
				attendee.check_out.map((check_out) => {
					arrayDatesWithCheckout.push(check_out.created_at);
				});
			}
		});

		const uniqueCheckInDatesArray = arrayDatesWithCheckin.filter((item, index, self) => {
			return index === self.indexOf(item);
		});

		const uniqueCheckOutDatesArray = arrayDatesWithCheckout.filter((item, index, self) => {
			return index === self.indexOf(item);
		});

		return Object.assign(
			{
				...event,
				attendees,
			},
			{
				dates_with_check_ins: uniqueCheckInDatesArray,
				dates_with_check_outs: uniqueCheckOutDatesArray,
			},
		);
	}
}
