import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindOneCheckInUseCase } from 'src/pass-in/check-ins/use-cases/find-one/find-one.use-case';
import { FindOneCheckOutUseCase } from 'src/pass-in/check-outs/use-cases/find-one/find-one.use-case';
import { roles } from 'src/shared/utils/constants/roles';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneAttendeeUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class DeleteAttendeeUseCase {
	constructor(
		@Inject(FindOneAttendeeUseCase) private readonly findOneAttendeeUseCase: FindOneAttendeeUseCase,
		@Inject(FindOneCheckInUseCase) private readonly findOneCheckInUseCase: FindOneCheckInUseCase,
		@Inject(FindOneCheckOutUseCase) private readonly findOneCheckOutUseCase: FindOneCheckOutUseCase,
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
	) {}
	async execute(id: string, current_user: CurrentUser) {
		const attendee = await this.findOneAttendeeUseCase.execute(id);

		if (Number(attendee.event.created_by_login_id) !== Number(current_user.user.loginId) && !current_user.user.roles.includes(roles.master))
			throw new NotAcceptableException({ message: `Somente o criador do evento pode excluí-lo` });

		const hasCheckin = await this.findOneCheckInUseCase.execute(id);

		if (hasCheckin)
			throw new NotAcceptableException({
				message: `O participante ${attendee.user.name} não foi removido do evento ${attendee.event.title}, pois já fez check-in.`,
			});

		const hasCheckout = await this.findOneCheckOutUseCase.execute(id);

		if (hasCheckout)
			throw new NotAcceptableException({
				message: `O participante ${attendee.user.name} não foi removido do evento ${attendee.event.title}, pois já fez check-out.`,
			});

		return await this.attendeesRepositoryInterface.delete(id);
	}
}
