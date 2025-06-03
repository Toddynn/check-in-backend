export function getEventStatus(startDate: Date, endDate: Date): string {
	const currentDate = new Date();

	const currentDateTime = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate(),
		currentDate.getHours(),
		currentDate.getMinutes(),
	);
	const startDateTime = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
	const endDateTime = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endDate.getHours(), endDate.getMinutes());

	if (currentDateTime < startDateTime) {
		return event_status.scheduled;
	} else if (currentDateTime >= startDateTime && currentDateTime <= endDateTime) {
		return event_status.progress;
	} else {
		return event_status.finished;
	}
}

export const event_status = {
	progress: 'Em Progresso',
	finished: 'Finalizado',
	scheduled: 'Agendado',
};
