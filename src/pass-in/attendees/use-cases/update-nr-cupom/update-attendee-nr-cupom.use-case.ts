import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { ensureIsCreatorOrResponsibleOfEvent } from 'src/shared/utils/functions/ensure-is-admin-or-responsible';
import { UpdateAttendeeDto } from '../../models/dto/update-attendee.dto';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneAttendeeByEventIdAndNrCupomUseCase } from '../find-one-by-event-id-and-nr-cupom/find-one-by-event-id-and-nr-cupom.use-case';
import { FindOneAttendeeUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class UpdateAttendeeNrCupomUseCase {
	constructor(
		@Inject(FindOneAttendeeUseCase) private readonly findOneAttendeeUseCase: FindOneAttendeeUseCase,
		@Inject(FindOneAttendeeByEventIdAndNrCupomUseCase)
		private readonly findOneAttendeeByEventIdAndNrCupomUseCase: FindOneAttendeeByEventIdAndNrCupomUseCase,
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
	) {}
	async execute(id: string, updateAttendeeDto: UpdateAttendeeDto, current_user: CurrentUser) {
		const attendee = await this.findOneAttendeeUseCase.execute(id);

		await ensureIsCreatorOrResponsibleOfEvent({
			event: { created_by_login_id: attendee.event.created_by_login_id, responsible_login_ids: attendee.event.responsible_login_ids },
			current_user,
			throw_message: 'Somente o criador do evento ou um responsável pode editar o Nr Cupom desse participante.',
		});

		const attendeeByNrCupomAndEventId = await this.findOneAttendeeByEventIdAndNrCupomUseCase.execute(attendee.event_id, updateAttendeeDto.nr_cupom);
		if (attendeeByNrCupomAndEventId && attendeeByNrCupomAndEventId.id !== attendee.id) {
			throw new NotAcceptableException({
				message: `Outro participante já possui o mesmo Nr cupom neste evento. Verifique os dados! participante existente: ${attendeeByNrCupomAndEventId.user.name}`,
			});
		}

		return await this.attendeesRepositoryInterface.update(id, updateAttendeeDto);
	}
}
