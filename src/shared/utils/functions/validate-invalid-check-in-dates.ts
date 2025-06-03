import { BadRequestException } from '@nestjs/common';
import { format, isAfter, isWithinInterval } from 'date-fns';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';

export async function validateCheckInDates({ check_in_dates, end_date, start_date }: { start_date: Date; end_date: Date; check_in_dates: CheckInDates[] }) {
	if (!check_in_dates) return;
	for (const check_in_date of check_in_dates) {
		if (
			!isWithinInterval(check_in_date.start_date, {
				start: start_date,
				end: end_date,
			})
		) {
			throw new BadRequestException({
				message: `A data de liberação do check in deve estar entre a data de início e fim do evento: ${format(check_in_date.start_date, 'dd/MM/yyyy')}`,
			});
		} else if (
			!isWithinInterval(check_in_date.end_date, {
				start: start_date,
				end: end_date,
			})
		) {
			throw new BadRequestException({
				message: `A data de fechamento do check in deve estar entre a data de início e fim do evento: ${format(check_in_date.end_date, 'dd/MM/yyyy')}`,
			});
		}

		if (isAfter(check_in_date.start_date, check_in_date.end_date)) {
			throw new BadRequestException({
				message: `A data de fechamento do check in deve ocorrer após a liberação do mesmo: ${format(check_in_date.end_date, 'dd/MM/yyyy')}`,
			});
		}
	}
}
