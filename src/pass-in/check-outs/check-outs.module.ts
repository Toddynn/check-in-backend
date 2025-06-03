import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from 'src/mailer/mailer.module';
import { SendMailUseCase } from 'src/mailer/use-cases/send-mail.use-case';
import { AttendeesModule } from '../attendees/attendees.module';
import { FindAllAttendeesByEventIdUseCase } from '../attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindOneAttendeeByEventAndAttendeeIdUseCase } from '../attendees/use-cases/find-one-by-event-and-attendee-id/find-one-by-event-and-attendee-id.use-case';
import { FindOneAttendeeByEventAndUserIdUseCase } from '../attendees/use-cases/find-one-by-event-and-user-id/find-one-by-event-and-user-id.use-case';
import { FindOneAttendeeUseCase } from '../attendees/use-cases/find-one/find-one.use-case';
import { FindOneCheckInByEventAndUserIdAndDateUseCase } from '../check-ins/use-cases/find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.use-case';
import { EventsModule } from '../events/events.module';
import { FindOneEventUseCase } from '../events/use-cases/find-one/find-one.use-case';
import { UsersModule } from '../users/users.module';
import { CheckOut } from './models/entities/check-outs.entity';
import { CheckOutsRepository } from './repository/check-outs.repository';
import { CreateCheckOutController } from './use-cases/create/create.controller';
import { CreateCheckOutUseCase } from './use-cases/create/create.use-case';
import { FindAllCheckOutsByEventIdAndDateUseCase } from './use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { FindAllCheckOutsByEventIdUseCase } from './use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindOneCheckOutByEventAndUserIdAndDateController } from './use-cases/find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.controller';
import { FindOneCheckOutByEventAndUserIdAndDateUseCase } from './use-cases/find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.use-case';
import { FindOneCheckOutUseCase } from './use-cases/find-one/find-one.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([CheckOut]), forwardRef(() => AttendeesModule), forwardRef(() => EventsModule), UsersModule, MailerModule],
	controllers: [CreateCheckOutController, FindOneCheckOutByEventAndUserIdAndDateController],
	providers: [
		{ provide: 'CheckOutsRepositoryInterface', useExisting: CheckOutsRepository },
		CheckOutsRepository,
		CreateCheckOutUseCase,
		FindAllCheckOutsByEventIdUseCase,
		FindOneCheckOutByEventAndUserIdAndDateUseCase,
		FindOneCheckOutUseCase,
		FindOneAttendeeByEventAndAttendeeIdUseCase,
		FindOneEventUseCase,
		FindOneCheckInByEventAndUserIdAndDateUseCase,
		SendMailUseCase,
		FindOneAttendeeByEventAndUserIdUseCase,
		FindOneAttendeeUseCase,
		FindAllAttendeesByEventIdUseCase,
		FindAllCheckOutsByEventIdAndDateUseCase,
	],
	exports: [
		FindOneCheckOutUseCase,
		FindAllCheckOutsByEventIdAndDateUseCase,
		FindAllCheckOutsByEventIdUseCase,
		{ provide: 'CheckOutsRepositoryInterface', useExisting: CheckOutsRepository },
	],
})
export class CheckOutsModule {}
