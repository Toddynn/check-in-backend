import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { EventsModule } from '../events/events.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { FindAllFeedbacksByQuestionIdUseCase } from '../feedbacks/use-cases/find-all-by-question-id/find-all-feedbacks-by-question-id.use-case';
import { FeedbackQuestion } from './models/entities/feedback-questions.entity';
import { FeedbackQuestionsRepository } from './repository/feedback-questions.repository';
import { CreateFeedbackQuestionController } from './use-cases/create/create-feedback-question.controller';
import { CreateFeedbackQuestionUseCase } from './use-cases/create/create-feedback-question.use-case';
import { DeleteFeedbackQuestionController } from './use-cases/delete/delete-feedback-question.controller';
import { DeleteFeedbackQuestionUseCase } from './use-cases/delete/delete-feedback-question.use-case';
import { FindOneFeedbackQuestionUseCase } from './use-cases/find-one/find-one-feedback-question.use-case';
import { UpdateFeedbackQuestionController } from './use-cases/update/update-feedback-question.controller';
import { UpdateFeedbackQuestionUseCase } from './use-cases/update/update-feedback-question.use-case';

@Module({
	imports: [TypeOrmModule.forFeature([FeedbackQuestion]), EventsModule, FeedbacksModule, AuthModule],
	controllers: [CreateFeedbackQuestionController, UpdateFeedbackQuestionController, DeleteFeedbackQuestionController],
	providers: [
		{ provide: 'FeedbackQuestionsRepositoryInterface', useExisting: FeedbackQuestionsRepository },
		FeedbackQuestionsRepository,
		FindAllFeedbacksByQuestionIdUseCase,
		CreateFeedbackQuestionUseCase,
		UpdateFeedbackQuestionUseCase,
		FindOneFeedbackQuestionUseCase,
		DeleteFeedbackQuestionUseCase,
	],
	exports: [],
})
export class FeedbackQuestionsModule {}
