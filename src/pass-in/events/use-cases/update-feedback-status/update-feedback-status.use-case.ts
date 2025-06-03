import { Inject, Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { UpdateEventDto } from '../../models/dto/update-event.dto';
import { EventsRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneEventWithAttendeesUseCase } from '../find-one-with-attendees/find-one-with-attendees.use-case';

@Injectable()
export class UpdateEventFeedbackStatusUseCase {
	constructor(
		@Inject(FindOneEventWithAttendeesUseCase) private readonly findEvent: FindOneEventWithAttendeesUseCase,
		@Inject('EventsRepositoryInterface') private readonly eventsRepository: EventsRepositoryInterface,
	) {}

	async execute(event_id: string, { is_feedback_open }: Pick<UpdateEventDto, 'is_feedback_open'>, current_user: CurrentUser) {
		const event = await this.findEvent.execute(event_id);

		await ensureIsCreatorOrResponsibleOfEvent({
			event: { created_by_login_id: event.created_by_login_id, responsible_login_ids: event.responsible_login_ids },
			current_user,
			throw_message: 'Somente o criador do evento ou um responsável pode adicionar perguntas de feedback a este evento.',
		});

		return await this.eventsRepository.update(event.id, { is_feedback_open });
	}
}
