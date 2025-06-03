import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { CheckInDatesModule } from '../check-in-dates/check-in-dates.module';
import { CheckInsModule } from '../check-ins/check-ins.module';
import { FindOneCheckInUseCase } from '../check-ins/use-cases/find-one/find-one.use-case';
import { CheckOutsModule } from '../check-outs/check-outs.module';
import { FindOneCheckOutUseCase } from '../check-outs/use-cases/find-one/find-one.use-case';
import { EventsModule } from '../events/events.module';
import { FindOneEventUseCase } from '../events/use-cases/find-one/find-one.use-case';
import { FindOneUserByIdUseCase } from '../users/use-cases/find-one-by-id/find-one-by-id.use-case';
import { UsersModule } from '../users/users.module';
import { Attendee } from './models/entities/attendee.entity';
import { AttendeesRepository } from './repository/attendees.repository';
import { CreateAttendeeController } from './use-cases/create/create.controller';
import { CreateAttendeeUseCase } from './use-cases/create/create.use-case';
import { DeleteAttendeeController } from './use-cases/delete/delete.controller';
import { DeleteAttendeeUseCase } from './use-cases/delete/delete.use-case';
import { FindAllAttendeesByEventIdController } from './use-cases/find-all-by-event-id/find-all-by-event-id.controller';
import { FindAllAttendeesByEventIdUseCase } from './use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { FindAllAttendeesController } from './use-cases/find-all/find-all.controller';
import { FindAllAttendeesUseCase } from './use-cases/find-all/find-all.use-case';
import { FindAttendeeBadgeController } from './use-cases/find-badge/find-badge.controller';
import { FindAttendeeBadgeUseCase } from './use-cases/find-badge/find-badge.use-case';
import { FindOneAttendeeByEventAndAttendeeIdUseCase } from './use-cases/find-one-by-event-and-attendee-id/find-one-by-event-and-attendee-id.use-case';
import { FindOneAttendeeByEventAndUserIdController } from './use-cases/find-one-by-event-and-user-id/find-one-by-event-and-user-id.controller';
import { FindOneAttendeeByEventAndUserIdUseCase } from './use-cases/find-one-by-event-and-user-id/find-one-by-event-and-user-id.use-case';
import { FindOneAttendeeByEventIdAndNrCupomUseCase } from './use-cases/find-one-by-event-id-and-nr-cupom/find-one-by-event-id-and-nr-cupom.use-case';
import { FindOneAttendeeController } from './use-cases/find-one/find-one.controller';
import { FindOneAttendeeUseCase } from './use-cases/find-one/find-one.use-case';
import { DeletePublicAttendeeController } from './use-cases/public-delete/public-delete.controller';
import { DeletePublicAttendeeUseCase } from './use-cases/public-delete/public-delete.use-case';
import { UpdateAttendeeNrCupomController } from './use-cases/update-nr-cupom/update-attendee-nr-cupom.controller';
import { UpdateAttendeeNrCupomUseCase } from './use-cases/update-nr-cupom/update-attendee-nr-cupom.use-case';

@Module({
	imports: [
		TypeOrmModule.forFeature([Attendee]),
		forwardRef(() => EventsModule),
		forwardRef(() => CheckInDatesModule),
		forwardRef(() => CheckInsModule),
		forwardRef(() => CheckOutsModule),
		UsersModule,
		MailerModule,
		AuthModule,
	],
	controllers: [
		CreateAttendeeController,
		FindOneAttendeeController,
		FindOneAttendeeByEventAndUserIdController,
		FindAttendeeBadgeController,
		FindAllAttendeesController,
		FindAllAttendeesByEventIdController,
		DeleteAttendeeController,
		DeletePublicAttendeeController,
		UpdateAttendeeNrCupomController,
	],
	providers: [
		{ provide: 'AttendeesRepositoryInterface', useExisting: AttendeesRepository },
		AttendeesRepository,
		CreateAttendeeUseCase,
		DeleteAttendeeUseCase,
		FindAllAttendeesUseCase,
		FindAllAttendeesByEventIdUseCase,
		FindOneAttendeeUseCase,
		FindOneAttendeeByEventAndUserIdUseCase,
		FindOneAttendeeByEventAndAttendeeIdUseCase,
		FindOneEventUseCase,
		FindOneUserByIdUseCase,
		DeletePublicAttendeeUseCase,
		FindOneCheckInUseCase,
		FindOneCheckOutUseCase,
		FindAttendeeBadgeUseCase,
		FindOneAttendeeByEventIdAndNrCupomUseCase,
		UpdateAttendeeNrCupomUseCase,
	],
	exports: [
		FindAllAttendeesByEventIdUseCase,
		FindOneAttendeeByEventAndAttendeeIdUseCase,
		{ provide: 'AttendeesRepositoryInterface', useExisting: AttendeesRepository },
	],
})
export class AttendeesModule {}
