import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendeesModule } from '../attendees/attendees.module';
import { FindAllAttendeesByEventIdUseCase } from '../attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindAllCheckOutsByEventIdAndDateUseCase } from '../check-outs/use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { EventsModule } from '../events/events.module';
import { FindOneEventUseCase } from '../events/use-cases/find-one/find-one.use-case';
import { UsersModule } from '../users/users.module';
import { CheckOutDates } from './models/entities/check-out-dates.entity';
import { CheckOutDatesRepository } from './repository/check-out-dates.repository';
import { CreateCheckOutDatesUseCase } from './use-cases/create/create.use-case';
import { DeleteCheckOutDateUseCase } from './use-cases/delete/delete.use-case';
import { FindAllCheckOutDatesByEventIdUseCase } from './use-cases/find-all/find-all.use-case';
import { FindOneCheckOutDateUseCase } from './use-cases/find-one/find-one.use-case';
import { UpdateCheckOutDatesUseCase } from './use-cases/update/update.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([CheckOutDates]), forwardRef(() => EventsModule), forwardRef(() => AttendeesModule), UsersModule],
	controllers: [],
	providers: [
		{ provide: 'CheckOutDatesRepositoryInterface', useExisting: CheckOutDatesRepository },
		CheckOutDatesRepository,
		CreateCheckOutDatesUseCase,
		UpdateCheckOutDatesUseCase,
		FindOneCheckOutDateUseCase,
		DeleteCheckOutDateUseCase,
		FindAllCheckOutsByEventIdAndDateUseCase,
		FindAllAttendeesByEventIdUseCase,
		FindOneEventUseCase,
		FindAllCheckOutDatesByEventIdUseCase,
	],
	exports: [
		CreateCheckOutDatesUseCase,
		FindOneCheckOutDateUseCase,
		DeleteCheckOutDateUseCase,
		FindAllCheckOutDatesByEventIdUseCase,
		UpdateCheckOutDatesUseCase,
		{ provide: 'CheckOutDatesRepositoryInterface', useExisting: CheckOutDatesRepository },
	],
})
export class CheckOutDatesModule {}
