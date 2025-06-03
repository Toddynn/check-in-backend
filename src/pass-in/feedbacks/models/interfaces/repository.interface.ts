import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { CreateAttendeeFeedbackDto } from '../dto/create-attendee-feedback.dto';
import { CreateFeedbackDto } from '../dto/create-feedback.dto';
import { Feedback } from '../entities/feedback.entity';

export interface FeedbacksRepositoryInterface {
	createAttendeeFeedback(createAttendeeFeedbackDto: CreateAttendeeFeedbackDto): Promise<Feedback>;
	createAdminFeedback(createFeedbackDto: CreateFeedbackDto, current_user: CurrentUser): Promise<Feedback>;
	findOneByAttendeeId(attendee_id: string): Promise<Feedback>;
	findAllByEventIdAndAdmin(event_id: string, { page, quantity }: GenericPagination): Promise<[Feedback[], number]>;
	findAllByEventIdAndAttendee(event_id: string, { page, quantity }: GenericPagination): Promise<[Feedback[], number]>;
	findAllByQuestionId(question_id: string): Promise<[Feedback[], number]>;
}
