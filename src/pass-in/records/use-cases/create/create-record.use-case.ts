import { Inject, Injectable } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { CreateRecordDto } from '../../models/dto/create-record.dto';
import { RecordsRepositoryInterface } from '../../models/interfaces/repository.interface';

@Injectable()
export class CreateRecordUseCase {
	constructor(
		@Inject('RecordsRepositoryInterface') private readonly recordsRepositoryInterface: RecordsRepositoryInterface,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	async execute(createRecordDto: CreateRecordDto, current_user: CurrentUser) {
		const event = await this.findOneEventUseCase.execute(createRecordDto.event_id);

		await ensureIsCreatorOrResponsibleOfEvent({
			event: { created_by_login_id: event.created_by_login_id, responsible_login_ids: event.responsible_login_ids },
			current_user,
			throw_message: 'Somente o criador ou responsável do evento pode escrever a Ata.',
		});

		return await this.recordsRepositoryInterface.createRecord(createRecordDto, current_user);
	}
}
