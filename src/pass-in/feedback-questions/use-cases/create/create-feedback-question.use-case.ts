import { Inject, Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { CreateFeedbackQuestionDto } from '../../models/dto/create-feedback-question.dto';
import { FeedbackQuestionsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class CreateFeedbackQuestionUseCase {
	constructor(
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject('FeedbackQuestionsRepositoryInterface') private readonly feedbackQuestionsRepository: FeedbackQuestionsRepositoryInterface,
	) {}

	async execute({ event_id, ...createFeedbackQuestionDto }: CreateFeedbackQuestionDto, current_user: CurrentUser) {
		const event = await this.findOneEventUseCase.execute(event_id, current_user);

		await ensureIsCreatorOrResponsibleOfEvent({
			event: { created_by_login_id: event.created_by_login_id, responsible_login_ids: event.responsible_login_ids },
			current_user,
			throw_message: 'Somente o criador do evento ou um responsável pode adicionar perguntas de feedback a este evento.',
		});

		return await this.feedbackQuestionsRepository.create({ event_id, ...createFeedbackQuestionDto });
	}
}
