import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeesModule } from '../attendees/attendees.module';
import { FindAllAttendeesByEventIdUseCase } from '../attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { CheckInsModule } from '../check-ins/check-ins.module';
import { FindAllCheckInsByEventIdAndDateUseCase } from '../check-ins/use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { CheckOutDatesModule } from '../check-out-dates/check-out-dates.module';
import { EventsModule } from '../events/events.module';
import { FindOneEventUseCase } from '../events/use-cases/find-one/find-one.use-case';
import { UsersModule } from '../users/users.module';
import { CheckInDates } from './models/entities/check-in-dates.entity';
import { CheckInDatesRepository } from './repository/check-in-dates.repository';
import { CreateCheckInDatesUseCase } from './use-cases/create/create.use-case';
import { DeleteCheckInDateUseCase } from './use-cases/delete/delete.use-case';
import { FindOneCheckInDateUseCase } from './use-cases/find-one/find-one.use-case';
import { UpdateCheckInDatesUseCase } from './use-cases/update/update.use-case';

@Module({
	imports: [
		TypeOrmModule.forFeature([CheckInDates]),
		forwardRef(() => EventsModule),
		forwardRef(() => AttendeesModule),
		CheckInsModule,
		CheckOutDatesModule,
		UsersModule,
	],
	controllers: [],
	providers: [
		{ provide: 'CheckInDatesRepositoryInterface', useExisting: CheckInDatesRepository },
		CheckInDatesRepository,
		CreateCheckInDatesUseCase,
		FindOneEventUseCase,
		UpdateCheckInDatesUseCase,
		FindAllCheckInsByEventIdAndDateUseCase,
		FindAllAttendeesByEventIdUseCase,
		FindOneCheckInDateUseCase,
		DeleteCheckInDateUseCase,
	],
	exports: [
		CreateCheckInDatesUseCase,
		UpdateCheckInDatesUseCase,
		DeleteCheckInDateUseCase,
		{ provide: 'CheckInDatesRepositoryInterface', useExisting: CheckInDatesRepository },
	],
})
export class CheckInDatesModule {}
