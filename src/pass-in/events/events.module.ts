import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AttendeesModule } from '../attendees/attendees.module';
import { FindAllAttendeesByEventIdUseCase } from '../attendees/use-cases/find-all-by-event-id/find-all-by-event-id.use-case';
import { CheckInDatesModule } from '../check-in-dates/check-in-dates.module';
import { CreateCheckInDatesUseCase } from '../check-in-dates/use-cases/create/create.use-case';
import { DeleteCheckInDateUseCase } from '../check-in-dates/use-cases/delete/delete.use-case';
import { FindOneCheckInDateUseCase } from '../check-in-dates/use-cases/find-one/find-one.use-case';
import { CheckInsModule } from '../check-ins/check-ins.module';
import { FindAllCheckInsByEventIdAndDateUseCase } from '../check-ins/use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { CheckOutDatesModule } from '../check-out-dates/check-out-dates.module';
import { DeleteCheckOutDateUseCase } from '../check-out-dates/use-cases/delete/delete.use-case';
import { FindOneCheckOutDateUseCase } from '../check-out-dates/use-cases/find-one/find-one.use-case';
import { CheckOutsModule } from '../check-outs/check-outs.module';
import { FindAllCheckOutsByEventIdAndDateUseCase } from '../check-outs/use-cases/find-all-by-event-id-and-date/find-all-by-event-id-and-date.use-case';
import { MediasModule } from '../medias/medias.module';
import { FindAllEventMediasForDeleteUseCase } from '../medias/use-cases/find-all-event-medias-for-delete/find-all-event-medias-for-delete.use-case';
import { RecordsModule } from '../records/records.module';
import { ThirdPartySoftwaresModule } from '../third-party-softwares/third-party-softwares.module';
import { UsersModule } from '../users/users.module';
import { Event } from './models/entities/events.entity';
import { EventsRepository } from './repository/events.repository';
import { GetTotalEventsByThirdPartySoftwareController } from './use-cases/chart-events-by-third-party-softwares/chart-events-by-third-party-softwares.controller';
import { GetTotalEventsByThirdPartySoftwareUseCase } from './use-cases/chart-events-by-third-party-softwares/chart-events-by-third-party-softwares.use-case';
import { GetChartTotalCheckInsAndCheckOutsByEventIdController } from './use-cases/chart-total-check-ins-and-check-outs-by-event-id/chart-total-check-ins-and-check-outs-by-event-id.controller';
import { GetChartTotalCheckInsAndCheckOutsByEventIdUseCase } from './use-cases/chart-total-check-ins-and-check-outs-by-event-id/chart-total-check-ins-and-check-outs-by-event-id.use-case';
import { CreateEventController } from './use-cases/create/create.controller';
import { CreateEventUseCase } from './use-cases/create/create.use-case';
import { DeleteEventController } from './use-cases/delete/delete.controller';
import { DeleteEventUseCase } from './use-cases/delete/delete.use-case';
import { FindAllPublicEventsController } from './use-cases/find-all-public/find-all-public.controller';
import { FindAllPublicEventsUseCase } from './use-cases/find-all-public/find-all-public.use-case';
import { FindAllEventsController } from './use-cases/find-all/find-all.controller';
import { FindAllEventsUseCase } from './use-cases/find-all/find-all.use-case';
import { FindOneEventWithAttendeesController } from './use-cases/find-one-with-attendees/find-one-with-attendees.controller';
import { FindOneEventWithAttendeesUseCase } from './use-cases/find-one-with-attendees/find-one-with-attendees.use-case';
import { AdminFindOneEventController } from './use-cases/find-one/admin-find-one.controller';
import { FindOneEventController } from './use-cases/find-one/find-one.controller';
import { FindOneEventUseCase } from './use-cases/find-one/find-one.use-case';
import { GenerateEventReportController } from './use-cases/generate-report/generate-report.controller';
import { GenerateEventReportUseCase } from './use-cases/generate-report/generate-report.use-case';
import { GetEventCheckInLinkSituationController } from './use-cases/get-check-in-link-situation/get-check-in-link-situation.controller';
import { GetEventCheckInLinkSituationUseCase } from './use-cases/get-check-in-link-situation/get-check-in-link-situation.use-case';
import { GetEventCheckInLinkController } from './use-cases/get-check-in-link/get-check-in-link.controller';
import { GetEventCheckInLinkUseCase } from './use-cases/get-check-in-link/get-check-in-link.use-case';
import { GetEventCheckOutLinkSituationController } from './use-cases/get-check-out-link-situation/get-check-out-link-situation.controller';
import { GetEventCheckOutLinkSituationUseCase } from './use-cases/get-check-out-link-situation/get-check-out-link-situation.use-case';
import { GetEventCheckOutLinkController } from './use-cases/get-check-out-link/get-check-out-link.controller';
import { GetEventCheckOutLinkUseCase } from './use-cases/get-check-out-link/get-check-out-link.use-case';
import { GetEventSubscriptionLinkSituationController } from './use-cases/get-subscription-link-situation/get-subscription-link-situation.controller';
import { GetEventSubscriptionLinkSituationUseCase } from './use-cases/get-subscription-link-situation/get-subscription-link-situation.use-case';
import { GetEventSubscriptionLinkController } from './use-cases/get-subscription-link/get-subscription-link.controller';
import { GetEventSubscriptionLinkUseCase } from './use-cases/get-subscription-link/get-subscription-link.use-case';
import { UpdateEventFeedbackStatusController } from './use-cases/update-feedback-status/update-feedback-status.controller';
import { UpdateEventFeedbackStatusUseCase } from './use-cases/update-feedback-status/update-feedback-status.use-case';
import { UpdateEventController } from './use-cases/update/update.controller';
import { UpdateEventUseCase } from './use-cases/update/update.use-case';

@Module({
	imports: [
		TypeOrmModule.forFeature([Event]),
		forwardRef(() => AttendeesModule),
		forwardRef(() => CheckInDatesModule),
		forwardRef(() => CheckOutDatesModule),
		forwardRef(() => CheckInsModule),
		forwardRef(() => CheckOutsModule),
		forwardRef(() => RecordsModule),
		forwardRef(() => MediasModule),
		ThirdPartySoftwaresModule,
		UsersModule,
		AuthModule,
	],
	controllers: [
		CreateEventController,
		UpdateEventController,
		DeleteEventController,
		FindAllEventsController,
		FindAllPublicEventsController,
		FindOneEventController,
		AdminFindOneEventController,
		FindOneEventWithAttendeesController,
		GenerateEventReportController,
		GetEventCheckInLinkController,
		GetEventCheckInLinkSituationController,
		GetEventSubscriptionLinkController,
		GetEventSubscriptionLinkSituationController,
		GetEventCheckOutLinkController,
		GetEventCheckOutLinkSituationController,
		GetChartTotalCheckInsAndCheckOutsByEventIdController,
		GetTotalEventsByThirdPartySoftwareController,
		UpdateEventFeedbackStatusController,
	],
	providers: [
		{ provide: 'EventsRepositoryInterface', useExisting: EventsRepository },
		EventsRepository,
		CreateEventUseCase,
		UpdateEventUseCase,
		DeleteEventUseCase,
		FindAllEventsUseCase,
		FindAllPublicEventsUseCase,
		FindOneEventUseCase,
		FindOneEventWithAttendeesUseCase,
		GenerateEventReportUseCase,
		GetEventCheckInLinkUseCase,
		GetEventCheckInLinkSituationUseCase,
		GetEventCheckOutLinkUseCase,
		GetEventCheckOutLinkSituationUseCase,
		GetEventSubscriptionLinkUseCase,
		GetEventSubscriptionLinkSituationUseCase,
		GetChartTotalCheckInsAndCheckOutsByEventIdUseCase,
		FindAllAttendeesByEventIdUseCase,
		FindAllCheckInsByEventIdAndDateUseCase,
		FindAllCheckOutsByEventIdAndDateUseCase,
		CreateCheckInDatesUseCase,
		FindOneCheckInDateUseCase,
		DeleteCheckInDateUseCase,
		FindOneCheckOutDateUseCase,
		DeleteCheckOutDateUseCase,
		FindAllEventMediasForDeleteUseCase,
		GetTotalEventsByThirdPartySoftwareUseCase,
		UpdateEventFeedbackStatusUseCase,
	],
	exports: [FindOneEventWithAttendeesUseCase, FindOneEventUseCase, { provide: 'EventsRepositoryInterface', useExisting: EventsRepository }],
})
export class EventsModule {}
