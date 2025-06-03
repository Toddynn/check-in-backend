import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AttendeesModule } from '../attendees/attendees.module';
import { FindOneAttendeeUseCase } from '../attendees/use-cases/find-one/find-one.use-case';
import { Feedback } from './models/entities/feedback.entity';
import { FeedbacksRepository } from './repository/feedbacks.repository';
import { CreateAdminFeedbackController } from './use-cases/create-for-admin/create-admin-feedback.controller';
import { CreateAdminFeedbackUseCase } from './use-cases/create-for-admin/create-admin-feedback.use-case';
import { CreateAttendeeFeedbackController } from './use-cases/create-for-attendee/create-attendee-feedback.controller';
import { CreateAttendeeFeedbackUseCase } from './use-cases/create-for-attendee/create-attendee-feedback.use-case';
import { FindAllFeedbacksByEventIdAndAdminController } from './use-cases/find-all-by-event-id-and-admin/find-all-feedbacks-by-event-id-and-admin.controller';
import { FindAllFeedbacksByEventIdAndAdminUseCase } from './use-cases/find-all-by-event-id-and-admin/find-all-feedbacks-by-event-id-and-admin.use-case';
import { FindAllFeedbacksByEventIdAndAttendeeController } from './use-cases/find-all-by-event-id-and-attendee/find-all-feedbacks-by-event-id-and-attendee.controller';
import { FindAllFeedbacksByEventIdAndAttendeeUseCase } from './use-cases/find-all-by-event-id-and-attendee/find-all-feedbacks-by-event-id-and-attendee.use-case';
import { FindAllFeedbacksByQuestionIdUseCase } from './use-cases/find-all-by-question-id/find-all-feedbacks-by-question-id.use-case';
import { FindOneFeedbackByAttendeeIdController } from './use-cases/find-one/find-one-feedback-by-attendee-id.controller';
import { FindOneFeedbackByAttendeeIdUseCase } from './use-cases/find-one/find-one-feedback-by-attendee-id.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([Feedback]), AttendeesModule, AuthModule],
	controllers: [
		CreateAdminFeedbackController,
		CreateAttendeeFeedbackController,
		FindAllFeedbacksByEventIdAndAdminController,
		FindAllFeedbacksByEventIdAndAttendeeController,
		FindOneFeedbackByAttendeeIdController,
	],
	providers: [
		{ provide: 'FeedbacksRepositoryInterface', useExisting: FeedbacksRepository },
		FeedbacksRepository,
		CreateAdminFeedbackUseCase,
		CreateAttendeeFeedbackUseCase,
		FindOneFeedbackByAttendeeIdUseCase,
		FindAllFeedbacksByEventIdAndAdminUseCase,
		FindAllFeedbacksByEventIdAndAttendeeUseCase,
		FindOneAttendeeUseCase,
		FindAllFeedbacksByQuestionIdUseCase,
	],
	exports: [{ provide: 'FeedbacksRepositoryInterface', useExisting: FeedbacksRepository }],
})
export class FeedbacksModule {}
