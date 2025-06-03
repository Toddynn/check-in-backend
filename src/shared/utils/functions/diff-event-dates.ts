import { isEqual } from 'date-fns';
import { CheckInDates } from 'src/pass-in/check-in-dates/models/entities/check-in-dates.entity';
import { CheckOutDates } from 'src/pass-in/check-out-dates/models/entities/check-out-dates.entity';

type PossibleDatesEntity = CheckInDates | CheckOutDates;

export function diffEventDatesByType<T extends PossibleDatesEntity>(
	oldDates: T[],
	newDates: T[],
): {
	added: T[];
	removed: T[];
	updated: T[];
} {
	return {
		added: getAddedDates(oldDates, newDates),
		removed: getRemovedDates(oldDates, newDates),
		updated: getUpdatedDates(oldDates, newDates),
	};
}

export function getAddedDates<T extends PossibleDatesEntity>(oldDates: T[], newDates: T[]): T[] {
	const oldSet = new Set(oldDates.map((d) => new Date(d.start_date).toDateString()));
	return newDates.filter((d) => !oldSet.has(new Date(d.start_date).toDateString()));
}

export function getRemovedDates<T extends PossibleDatesEntity>(oldDates: T[], newDates: T[]): T[] {
	const newSet = new Set(newDates.map((d) => new Date(d.start_date).toDateString()));
	return oldDates.filter((d) => !newSet.has(new Date(d.start_date).toDateString()));
}

export function getUpdatedDates<T extends PossibleDatesEntity>(oldDates: T[], newDates: T[]): T[] {
	const oldMap = new Map(oldDates.map((d) => [new Date(d.start_date).toDateString(), d]));

	const updates = [];

	for (const newDate of newDates) {
		const key = new Date(newDate.start_date).toDateString();
		const old = oldMap.get(key);

		if (!old) continue;

		const changed = !isEqual(new Date(old.start_date), new Date(newDate.start_date)) || !isEqual(new Date(old.end_date), new Date(newDate.end_date));

		if (changed) {
			updates.push({
				id: old.id,
				start_date: newDate.start_date,
				end_date: newDate.end_date,
			});
		}
	}

	return updates;
}
