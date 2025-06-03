import { HttpException, Inject, Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { defineMediaType } from 'src/shared/utils/functions/define-media-type';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { sanitizeToLatin1 } from 'src/shared/utils/functions/sanitize-to-latin-1';
import { MediasRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class UploadEventMediaUseCase {
	constructor(
		@Inject('MediasRepositoryInterface') private readonly mediasRepositoryInterface: MediasRepositoryInterface,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	async execute(event_id: string, files: Array<Express.Multer.File>, current_user?: CurrentUser) {
		const event = await this.findOneEventUseCase.execute(event_id, current_user);
		await ensureIsCreatorOrResponsibleOfEvent({
			event: { created_by_login_id: event.created_by_login_id, responsible_login_ids: event.responsible_login_ids },
			current_user,
			throw_message: 'Somente o criador do evento ou um responsável pode adicionar uma mídia.',
		});

		const savedMedias = [];

		for (const file of files) {
			try {
				const file_type = await defineMediaType(file.mimetype);
				const formatted_name = sanitizeToLatin1(file.originalname);

				const saved = await this.mediasRepositoryInterface.save({
					file_name: formatted_name,
					path: file.path,
					type: file_type,
					event_id: event.id,
				});

				savedMedias.push(saved);
			} catch (err) {
				unlinkSync(file.path);
				throw new HttpException(err.message, err.status || 500);
			}
		}

		return savedMedias;
	}
}
