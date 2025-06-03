import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { FindOneAttendeeByEventAndUserIdUseCase } from 'src/pass-in/attendees/use-cases/find-one-by-event-and-user-id/find-one-by-event-and-user-id.use-case';
import { FindOneCheckInByEventAndUserIdAndDateUseCase } from 'src/pass-in/check-ins/use-cases/find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.use-case';
import { compareDates } from 'src/shared/utils/functions/compare-dates';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';

@Injectable()
export class FindOneCheckOutByEventAndUserIdAndDateUseCase {
	constructor(
		@Inject(FindOneCheckInByEventAndUserIdAndDateUseCase)
		private readonly findOneCheckInByEventAndUserIdAndDateUseCase: FindOneCheckInByEventAndUserIdAndDateUseCase,
		@Inject(FindOneAttendeeByEventAndUserIdUseCase) private readonly findOneAttendeeByEventAndUserIdUseCase: FindOneAttendeeByEventAndUserIdUseCase,
	) {}
	async execute(event_id: string, user_id: string, date: Date) {
		const attendee = await this.findOneAttendeeByEventAndUserIdUseCase.execute(event_id, user_id, ThrowHandlingStrategy.THROW_NOT_FOUND);

		const check_in = await this.findOneCheckInByEventAndUserIdAndDateUseCase.execute(event_id, user_id, date);

		if (!check_in.alreadyCheckedIn) {
			throw new NotAcceptableException({
				message: `Usuário deve fazer o check-in antes de fazer o check-out.`,
			});
		}

		let result = [];
		for (const check_out of attendee?.check_out) {
			result.push(compareDates(date, check_out.created_at));
		}

		const alreadyCheckedOut = result.some((res) => res === true);

		return { alreadyCheckedOut: alreadyCheckedOut };
	}
}
