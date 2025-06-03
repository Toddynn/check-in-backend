export function isSameDate(firstDate: Date, secondDate: Date): boolean {
	return !!(
		firstDate.getUTCDay() === secondDate.getUTCDay() &&
		firstDate.getUTCMonth() === secondDate.getUTCMonth() &&
		firstDate.getUTCFullYear() === secondDate.getUTCFullYear()
	);
}
