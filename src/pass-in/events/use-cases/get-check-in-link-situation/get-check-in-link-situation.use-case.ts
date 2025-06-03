import { Inject, Injectable } from '@nestjs/common';
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';
import { compareDates } from 'src/shared/utils/functions/compare-dates';
import { FindOneEventUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class GetEventCheckInLinkSituationUseCase {
	constructor(@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase) {}
	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);

		let returnValue = {};

		if (isBefore(new Date(), new Date(event.start_date))) {
			returnValue = {
				status: false,
				reason: 'Evento ainda não começou',
				event: {
					title: event.title,
					third_party_software: event.third_party_software?.name,
					date: event.start_date,
				},
			};
		} else if (isAfter(new Date(), new Date(event.end_date))) {
			returnValue = {
				status: false,
				reason: 'Evento já terminou',
				event: {
					title: event.title,
					third_party_software: event.third_party_software?.name,
					date: event.end_date,
				},
			};
		} else if (event.check_in_dates.filter((date) => compareDates(date.start_date, new Date())).length === 0) {
			returnValue = {
				status: false,
				reason: 'Não é necessário fazer check-in no dia de hoje',
				event: {
					title: event.title,
					third_party_software: event.third_party_software?.name,
				},
			};
		} else if (event.check_in_dates.length > 0) {
			for (const check_in_date of event.check_in_dates) {
				if (isSameDay(check_in_date.start_date, new Date())) {
					const { valid, message, date } = await this.VerifyIfIsValidCheckInDatePeriod(check_in_date);

					if (!valid) {
						returnValue = {
							status: false,
							reason: message,
							event: {
								title: event.title,
								third_party_software: event.third_party_software?.name,
								date: date!,
							},
						};
					} else {
						returnValue = {
							status: true,
							reason: undefined,
							event: {
								title: event.title,
								third_party_software: event.third_party_software?.name,
							},
						};
					}
				}
			}
		}
		return returnValue;
	}

	private async VerifyIfIsValidCheckInDatePeriod(check_in_date: CheckInDates): Promise<{
		valid: boolean;
		message: string;
		date?: Date;
	}> {
		if (isAfter(new Date(), check_in_date.end_date)) {
			return {
				valid: false,
				message: 'O prazo para realizar o check-in já finalizou',
				date: check_in_date.end_date,
			};
		}
		if (isBefore(new Date(), check_in_date.start_date)) {
			return {
				valid: false,
				message: 'Check-in ainda não liberado no dia de hoje',
				date: check_in_date.start_date,
			};
		}
		return { valid: true, message: null };
	}
}
