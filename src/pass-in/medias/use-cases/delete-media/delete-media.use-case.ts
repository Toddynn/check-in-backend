import { HttpException, Inject, Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { MediasRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneMediaByIdUseCase } from '../find-one-by-id/find-one-by-id.use-case';

@Injectable()
export class DeleteMediaUseCase {
	constructor(
		@Inject('MediasRepositoryInterface') private readonly mediasRepositoryInterface: MediasRepositoryInterface,
		@Inject(FindOneMediaByIdUseCase) private readonly findOneMediaByIdUseCase: FindOneMediaByIdUseCase,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	async execute(media_id: string, current_user: CurrentUser) {
		const media = await this.findOneMediaByIdUseCase.execute(media_id, ThrowHandlingStrategy.THROW_NOT_FOUND);

		if (media.event_id) {
			const event = await this.findOneEventUseCase.execute(media.event_id, current_user);
			await ensureIsCreatorOrResponsibleOfEvent({
				event: { created_by_login_id: event.created_by_login_id, responsible_login_ids: event.responsible_login_ids },
				current_user,
				throw_message: 'Somente o criador do evento ou um responsável pode excluir uma mídia.',
			});
		}

		try {
			if (existsSync(media.path)) {
				unlinkSync(media.path);
			}

			return await this.mediasRepositoryInterface.delete(media.id);
		} catch (err) {
			throw new HttpException(err.message, err.status);
		}
	}
}
