import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateFeedbackQuestionDto } from '../dto/create-feedback-question.dto';
import { UpdateFeedbackQuestionDto } from '../dto/update-feedback-question.dto';
import { FeedbackQuestion } from '../entities/feedback-questions.entity';

export interface FeedbackQuestionsRepositoryInterface {
	create(createFeedbackQuestionDto: CreateFeedbackQuestionDto): Promise<FeedbackQuestion>;
	findOne(feedback_question_id: string): Promise<FeedbackQuestion>;
	update(id: string, updateFeedbackQuestionDto: UpdateFeedbackQuestionDto): Promise<UpdateResult>;
	delete(id: string): Promise<DeleteResult>;
}
