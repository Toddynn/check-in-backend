import { BadRequestException, HttpException, Inject, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import {
	EventWithAdditionalData,
	FindOneEventWithAttendeesUseCase,
} from 'src/pass-in/events/use-cases/find-one-with-attendees/find-one-with-attendees.use-case';
import { FindOneUserByIdUseCase } from 'src/pass-in/users/use-cases/find-one-by-id/find-one-by-id.use-case';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { CreateAttendeeDto } from '../../models/dto/create-attendee.dto';
import { AttendeesRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneAttendeeByEventAndUserIdUseCase } from '../find-one-by-event-and-user-id/find-one-by-event-and-user-id.use-case';
import { FindOneAttendeeByEventIdAndNrCupomUseCase } from '../find-one-by-event-id-and-nr-cupom/find-one-by-event-id-and-nr-cupom.use-case';

@IsPublic()
@Injectable()
export class CreateAttendeeUseCase {
	constructor(
		@Inject(FindOneEventWithAttendeesUseCase)
		private readonly findOneEventWithAttendeesUseCase: FindOneEventWithAttendeesUseCase,
		@Inject(FindOneUserByIdUseCase)
		private readonly findOneUserByIdUseCase: FindOneUserByIdUseCase,
		@Inject(FindOneAttendeeByEventAndUserIdUseCase)
		private readonly findOneAttendeeByEventAndUserIdUseCase: FindOneAttendeeByEventAndUserIdUseCase,
		@Inject(FindOneAttendeeByEventIdAndNrCupomUseCase)
		private readonly findOneAttendeeByEventIdAndNrCupomUseCase: FindOneAttendeeByEventIdAndNrCupomUseCase,
		@Inject('AttendeesRepositoryInterface') private readonly attendeesRepositoryInterface: AttendeesRepositoryInterface,
	) {}
	async execute(createAttendeeDto: CreateAttendeeDto) {
		for (const id of createAttendeeDto.users_ids) {
			try {
				const event = await this.findOneEventWithAttendeesUseCase.execute(createAttendeeDto.event_id);

				await this.verifyLimit(event);

				const user = await this.findOneUserByIdUseCase.execute(id);

				if (!user) {
					throw new NotFoundException({ message: 'Usuário não encontrado. Por favor, cadastre o usuário para adicioná-lo como participante.' });
				}

				const userInEvent = await this.findOneAttendeeByEventAndUserIdUseCase.execute(event.id, user.id, ThrowHandlingStrategy.IGNORE_NOT_FOUND);

				if (userInEvent) {
					throw new NotAcceptableException({ message: `Usuário ${user.name} já cadastrado no evento ${event.title}.` });
				}

				if (createAttendeeDto.nr_cupom) {
					const existingNrCupom = await this.findOneAttendeeByEventIdAndNrCupomUseCase.execute(event.id, createAttendeeDto.nr_cupom);

					if (existingNrCupom)
						throw new NotAcceptableException({
							message: 'Um usuário já está cadastrado com esse Nr cupom, em caso de conflito entre em contato com a administração do evento.',
						});
				}

				await this.attendeesRepositoryInterface.create(createAttendeeDto.event_id, user.id, createAttendeeDto.nr_cupom);
			} catch (err) {
				throw new HttpException(err.message, err.status);
			}
		}

		return;
	}

	private async verifyLimit(event: Partial<EventWithAdditionalData>) {
		const amountOfAttendeesForEvent = event.attendees?.length || 0;

		if (event.maximum_attendees && amountOfAttendeesForEvent >= event.maximum_attendees) {
			throw new BadRequestException({ message: `Este evento já possui o máximo de ${event.maximum_attendees} participante(s).` });
		}
	}
}
