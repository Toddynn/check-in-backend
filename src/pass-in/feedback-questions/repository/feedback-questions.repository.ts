import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeedbackQuestionDto } from '../models/dto/create-feedback-question.dto';
import { UpdateFeedbackQuestionDto } from '../models/dto/update-feedback-question.dto';
import { FeedbackQuestion } from '../models/entities/feedback-questions.entity';
import { FeedbackQuestionsRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class FeedbackQuestionsRepository implements FeedbackQuestionsRepositoryInterface {
	constructor(
		@InjectRepository(FeedbackQuestion)
		private readonly feedbackQuestionsRepository: Repository<FeedbackQuestion>,
	) {}

	async create(createFeedbackQuestionDto: CreateFeedbackQuestionDto) {
		return await this.feedbackQuestionsRepository.save(createFeedbackQuestionDto);
	}

	async findOne(feedback_question_id: string) {
		return await this.feedbackQuestionsRepository.findOne({ where: { id: feedback_question_id } });
	}

	async update(id: string, updateFeedbackQuestionDto: UpdateFeedbackQuestionDto) {
		return await this.feedbackQuestionsRepository.update(id, {
			expected_response: updateFeedbackQuestionDto.expected_response,
			question: updateFeedbackQuestionDto.question,
			helper_text: updateFeedbackQuestionDto.helper_text,
			updated_at: new Date(),
		});
	}

	async delete(id: string) {
		return await this.feedbackQuestionsRepository.delete(id);
	}
}
