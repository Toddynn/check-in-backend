import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { FindOneCheckInUseCase } from 'src/pass-in/check-ins/use-cases/find-one/find-one.use-case';
import { FindOneCheckOutUseCase } from 'src/pass-in/check-outs/use-cases/find-one/find-one.use-case';
import { FindOneUserByIdUseCase } from 'src/pass-in/users/use-cases/find-one-by-id/find-one-by-id.use-case';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneAttendeeUseCase } from '../find-one/find-one.use-case';

@Injectable()
export class DeletePublicAttendeeUseCase {
	constructor(
		@Inject(FindOneAttendeeUseCase) private readonly findOneAttendeeUseCase: FindOneAttendeeUseCase,
		@Inject(FindOneCheckInUseCase) private readonly findOneCheckInUseCase: FindOneCheckInUseCase,
		@Inject(FindOneCheckOutUseCase) private readonly findOneCheckOutUseCase: FindOneCheckOutUseCase,
		@Inject(FindOneUserByIdUseCase) private readonly findOneUserByIdUseCase: FindOneUserByIdUseCase,
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
	) {}
	async execute(attendee_id: string, user_id: string) {
		const attendee = await this.findOneAttendeeUseCase.execute(attendee_id);

		const user = await this.findOneUserByIdUseCase.execute(user_id);

		const hasCheckin = await this.findOneCheckInUseCase.execute(attendee.id);

		if (hasCheckin)
			throw new NotAcceptableException({
				message: `O participante ${attendee.user.name} não foi removido do evento ${attendee.event.title}, pois já fez check-in.`,
			});

		const hasCheckout = await this.findOneCheckOutUseCase.execute(attendee.id);

		if (hasCheckout)
			throw new NotAcceptableException({
				message: `O participante ${attendee.user.name} não foi removido do evento ${attendee.event.title}, pois já fez check-out.`,
			});

		if (attendee.user_id !== user.id) {
			throw new NotAcceptableException({ message: 'Não é possível cancelar a participação de outras pessoas!' });
		}

		await this.attendeesRepositoryInterface.delete(attendee.id);
	}
}
