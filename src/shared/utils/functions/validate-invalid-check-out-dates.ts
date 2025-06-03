import { NotAcceptableException } from '@nestjs/common';
import { format, isAfter, isSameDay, isWithinInterval } from 'date-fns';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';
import { CheckOutDates } from 'src/pass-in/check-out-dates/models/entities/check-out-dates.entity';

export async function validateCheckOutDates({
	check_out_dates,
	check_in_dates,
	end_date,
	start_date,
}: {
	start_date: Date;
	end_date: Date;
	check_out_dates: CheckOutDates[];
	check_in_dates: CheckInDates[];
}) {
	if (!check_out_dates) return;
	for (const check_out_date of check_out_dates) {
		const existing_check_in_date = check_in_dates.some(
			(check_in_date) => isSameDay(check_in_date.start_date, check_out_date.start_date) && isSameDay(check_in_date.end_date, check_out_date.end_date),
		);
		if (!existing_check_in_date) {
			throw new NotAcceptableException({
				message: `A data de check out ${format(check_out_date.start_date, 'dd/MM/yyyy')} é inválida. Só é possível exigir um check out em uma data que exige check in.`,
			});
		}
		if (
			!isWithinInterval(check_out_date.start_date, {
				start: start_date,
				end: end_date,
			})
		) {
			throw new NotAcceptableException({
				message: `A data de liberação do check out deve estar entre a data de início e fim do evento: ${format(check_out_date.start_date, 'dd/MM/yyyy')}`,
			});
		} else if (
			!isWithinInterval(check_out_date.end_date, {
				start: start_date,
				end: end_date,
			})
		) {
			throw new NotAcceptableException({
				message: `A data de fechamento do check out deve estar entre a data de início e fim do evento: ${format(check_out_date.end_date, 'dd/MM/yyyy')}`,
			});
		}

		if (isAfter(check_out_date.start_date, check_out_date.end_date)) {
			throw new NotAcceptableException({
				message: `A data de fechamento do check out deve ocorrer após a liberação do mesmo: ${format(check_out_date.end_date, 'dd/MM/yyyy')}`,
			});
		}
	}
}
