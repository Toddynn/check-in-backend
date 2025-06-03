import { isSameDate } from './validate-is-same-date';

export function compareDates(date1: Date, date2: Date): boolean {
	return isSameDate(new Date(date1), new Date(date2));
}
