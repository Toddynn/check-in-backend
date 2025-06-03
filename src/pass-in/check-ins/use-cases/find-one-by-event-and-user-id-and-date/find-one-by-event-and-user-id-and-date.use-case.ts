import { Inject, Injectable } from '@nestjs/common';
import { FindOneAttendeeByEventAndUserIdUseCase } from 'src/pass-in/attendees/use-cases/find-one-by-event-and-user-id/find-one-by-event-and-user-id.use-case';
import { compareDates } from 'src/shared/utils/functions/compare-dates';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';

@Injectable()
export class FindOneCheckInByEventAndUserIdAndDateUseCase {
	constructor(
		@Inject(FindOneAttendeeByEventAndUserIdUseCase) private readonly findOneAttendeeByEventAndUserIdUseCase: FindOneAttendeeByEventAndUserIdUseCase,
	) {}
	async execute(event_id: string, user_id: string, date: Date) {
		const attendee = await this.findOneAttendeeByEventAndUserIdUseCase.execute(event_id, user_id, ThrowHandlingStrategy.THROW_NOT_FOUND);

		let result = [];
		for (const check_in of attendee.check_in) {
			result.push(compareDates(date, check_in.created_at));
		}

		const alreadyCheckedIn = result.some((res) => res === true);

		return { alreadyCheckedIn: alreadyCheckedIn };
	}
}
