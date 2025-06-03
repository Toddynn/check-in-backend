import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from 'src/mailer/mailer.module';
import { SendMailUseCase } from 'src/mailer/use-cases/send-mail.use-case';
import { AttendeesModule } from '../attendees/attendees.module';
import { FindAllAttendeesByEventIdUseCase } from '../attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindOneAttendeeByEventAndAttendeeIdUseCase } from '../attendees/use-cases/find-one-by-event-and-attendee-id/find-one-by-event-and-attendee-id.use-case';
import { FindOneAttendeeByEventAndUserIdUseCase } from '../attendees/use-cases/find-one-by-event-and-user-id/find-one-by-event-and-user-id.use-case';
import { FindOneAttendeeUseCase } from '../attendees/use-cases/find-one/find-one.use-case';
import { EventsModule } from '../events/events.module';
import { FindOneEventUseCase } from '../events/use-cases/find-one/find-one.use-case';
import { UsersModule } from '../users/users.module';
import { CheckIn } from './models/entities/check-in.entity';
import { CheckInsRepository } from './repository/check-ins.repository';
import { CreateCheckInController } from './use-cases/create/create.controller';
import { CreateCheckInUseCase } from './use-cases/create/create.use-case';
import { FindAllCheckInsByEventIdAndDateUseCase } from './use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { FindAllCheckInsByEventIdUseCase } from './use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindOneCheckInByEventAndUserIdAndDateController } from './use-cases/find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.controller';
import { FindOneCheckInByEventAndUserIdAndDateUseCase } from './use-cases/find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.use-case';
import { FindOneCheckInUseCase } from './use-cases/find-one/find-one.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([CheckIn]), forwardRef(() => AttendeesModule), EventsModule, UsersModule, MailerModule],
	controllers: [CreateCheckInController, FindOneCheckInByEventAndUserIdAndDateController],
	providers: [
		{ provide: 'CheckInsRepositoryInterface', useExisting: CheckInsRepository },
		CheckInsRepository,
		CreateCheckInUseCase,
		FindAllCheckInsByEventIdUseCase,
		FindOneCheckInByEventAndUserIdAndDateUseCase,
		FindOneCheckInUseCase,
		FindOneAttendeeByEventAndAttendeeIdUseCase,
		FindOneEventUseCase,
		SendMailUseCase,
		FindOneAttendeeByEventAndUserIdUseCase,
		FindOneAttendeeUseCase,
		FindAllAttendeesByEventIdUseCase,
		FindAllCheckInsByEventIdAndDateUseCase,
	],
	exports: [
		FindOneCheckInUseCase,
		FindAllCheckInsByEventIdUseCase,
		FindAllCheckInsByEventIdAndDateUseCase,
		FindOneCheckInByEventAndUserIdAndDateUseCase,
		{ provide: 'CheckInsRepositoryInterface', useExisting: CheckInsRepository },
	],
})
export class CheckInsModule {}
