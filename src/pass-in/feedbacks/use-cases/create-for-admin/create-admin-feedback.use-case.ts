import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateFeedbackDto } from '../../models/dto/create-feedback.dto';
import { FeedbacksRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class CreateAdminFeedbackUseCase {
	constructor(@Inject('FeedbacksRepositoryInterface') private readonly feedbacksRepositoryInterface: FeedbacksRepositoryInterface) {}

	async execute(createFeedbackDto: CreateFeedbackDto, current_user: CurrentUser) {
		if (current_user.user.roles.length <= 0) throw new NotAcceptableException({ message: 'Sem permissão para dar feedback do evento' });

		return await this.feedbacksRepositoryInterface.createAdminFeedback(createFeedbackDto, current_user);
	}
}
