import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { IsNull, MoreThan, Not, Repository } from 'typeorm';
import { CreateAttendeeFeedbackDto } from '../models/dto/create-attendee-feedback.dto';
import { CreateFeedbackDto } from '../models/dto/create-feedback.dto';
import { Feedback } from '../models/entities/feedback.entity';
import { FeedbacksRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class FeedbacksRepository implements FeedbacksRepositoryInterface {
	constructor(
		@InjectRepository(Feedback)
		private readonly feedbacksRepository: Repository<Feedback>,
	) {}

	async createAdminFeedback(createFeedbackDto: CreateFeedbackDto, current_user: CurrentUser) {
		return await this.feedbacksRepository.save({ ...createFeedbackDto, admin_id: Number(current_user.user.loginId), admin: current_user.user.nome });
	}

	async createAttendeeFeedback(createAttendeeFeedbackDto: CreateAttendeeFeedbackDto) {
		return await this.feedbacksRepository.save({ ...createAttendeeFeedbackDto });
	}

	async findOneByAttendeeId(attendee_id: string) {
		return await this.feedbacksRepository.findOne({
			where: {
				attendee_id,
			},
		});
	}

	async findAllByEventIdAndAdmin(event_id: string, { page, quantity }: GenericPagination): Promise<[Feedback[], number]> {
		try {
			return await this.feedbacksRepository.findAndCount({
				skip: (page - 1) * quantity,
				take: quantity,
				where: { event_id: event_id, admin_id: MoreThan(0) },
				order: {
					created_at: 'DESC',
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async findAllByEventIdAndAttendee(event_id: string, { page, quantity }: GenericPagination): Promise<[Feedback[], number]> {
		try {
			return await this.feedbacksRepository.findAndCount({
				skip: (page - 1) * quantity,
				take: quantity,
				where: {
					event_id: event_id,
					admin_id: IsNull(),
				},
				relations: {
					attendee: {
						user: true,
					},
					event: {
						feedback_questions: true,
					},
				},
				select: {
					event: {
						feedback_questions: {
							expected_response: true,
							id: true,
							question: true,
						},
					},
				},
				order: {
					created_at: 'DESC',
				},
			});
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	async findAllByQuestionId(question_id: string): Promise<[Feedback[], number]> {
		const allFeedbacks = await this.feedbacksRepository.find({ where: { feedback_extra_answers: Not(IsNull()) } });

		const filteredFeedbacks = allFeedbacks.filter((feedback) => feedback.feedback_extra_answers.some((answer) => answer.question_id === question_id));

		return [filteredFeedbacks, filteredFeedbacks.length];
	}
}
