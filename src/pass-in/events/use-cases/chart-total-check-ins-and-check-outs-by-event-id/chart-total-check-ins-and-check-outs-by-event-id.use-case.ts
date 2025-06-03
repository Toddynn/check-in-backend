import { Inject, Injectable } from '@nestjs/common';
import { eachDayOfInterval, format } from 'date-fns';
import { FindAllAttendeesByEventIdUseCase } from 'src/pass-in/attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindAllCheckInsByEventIdUseCase } from 'src/pass-in/check-ins/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindAllCheckOutsByEventIdUseCase } from 'src/pass-in/check-outs/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindOneEventUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class GetChartTotalCheckInsAndCheckOutsByEventIdUseCase {
	constructor(
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject(FindAllCheckInsByEventIdUseCase) private readonly findAllCheckInsByEventIdUseCase: FindAllCheckInsByEventIdUseCase,
		@Inject(FindAllCheckOutsByEventIdUseCase) private readonly findAllCheckOutsByEventIdUseCase: FindAllCheckOutsByEventIdUseCase,
		@Inject(FindAllAttendeesByEventIdUseCase) private readonly findAllAttendeesByEventIdUseCase: FindAllAttendeesByEventIdUseCase,
	) {}

	async execute(event_id: string) {
		const event = await this.findOneEventUseCase.execute(event_id);
		const { length: attendees_count } = await this.findAllAttendeesByEventIdUseCase.execute(event.id);

		const [check_ins, check_ins_total_count] = await this.findAllCheckInsByEventIdUseCase.execute(event.id);
		const [check_outs, check_outs_total_count] = await this.findAllCheckOutsByEventIdUseCase.execute(event.id);

		const allDates = eachDayOfInterval({
			start: event.start_date,
			end: event.end_date,
		}).map((date) => format(date, 'yyyy-MM-dd'));

		const groupedData = this.groupDataByDate(check_ins, check_outs, allDates);

		const expected_total_check_outs = event.check_out_dates.length > 0 ? attendees_count * event.check_out_dates.length : 0;
		const expected_total_check_ins = attendees_count * event.check_in_dates.length;

		return {
			check_ins_total_count,
			check_outs_total_count,
			attendees_count,
			expected_total_check_ins,
			expected_total_check_outs,
			dates: groupedData,
		};
	}

	private groupDataByDate(checkIns: any[], checkOuts: any[], allDates: string[]): { date: string; check_ins: number; check_outs: number }[] {
		const checkInsMap = new Map<string, number>();
		const checkOutsMap = new Map<string, number>();

		checkIns.forEach(({ created_at }) => {
			const date = format(new Date(created_at), 'yyyy-MM-dd');
			checkInsMap.set(date, (checkInsMap.get(date) || 0) + 1);
		});

		checkOuts.forEach(({ created_at }) => {
			const date = format(new Date(created_at), 'yyyy-MM-dd');
			checkOutsMap.set(date, (checkOutsMap.get(date) || 0) + 1);
		});

		return allDates.map((date) => ({
			date,
			check_ins: checkInsMap.get(date) || 0,
			check_outs: checkOutsMap.get(date) || 0,
		}));
	}
}
