import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { roles } from 'src/shared/utils/constants/roles';
import { Repository } from 'typeorm';
import { UpdateAttendeeDto } from '../models/dto/update-attendee.dto';
import { Attendee } from '../models/entities/attendee.entity';
import { AttendeesRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class AttendeesRepository implements AttendeesRepositoryInterface {
	constructor(
		@InjectRepository(Attendee)
		private readonly attendeesRepository: Repository<Attendee>,
	) {}

	async create(event_id: string, user_id: string, nr_cupom?: string) {
		await this.attendeesRepository.save({ event_id, user_id, nr_cupom });
	}

	async update(id: string, updateAttendeeDto: UpdateAttendeeDto) {
		await this.attendeesRepository.update(id, { nr_cupom: updateAttendeeDto.nr_cupom, updated_at: new Date() });
	}

	async delete(id: string) {
		await this.attendeesRepository.delete(id);
	}

	async findOne(id: string) {
		return await this.attendeesRepository.findOne({
			where: { id: id },
			relations: {
				check_in: true,
				check_out: true,
				event: {
					check_in_dates: true,
					check_out_dates: true,
				},
				user: true,
			},
			select: {
				check_in: {
					created_at: true,
				},
				check_out: {
					created_at: true,
				},
				event: {
					title: true,
					check_in_dates: true,
					check_out_dates: true,
					start_date: true,
					end_date: true,
					created_by_login_id: true,
					responsible_login_ids: true,
				},
				user: {
					created_at: true,
					updated_at: true,
					email: true,
					phone_number: true,
					name: true,
				},
			},
		});
	}

	async findOneByEventIdAndNrCupom(event_id: string, nr_cupom: string) {
		return await this.attendeesRepository.findOne({
			where: {
				event_id,
				nr_cupom,
			},
			relations: {
				user: true,
			},
			select: {
				user: {
					name: true,
				},
			},
		});
	}

	async findOneByEventAndUserId(event_id: string, user_id: string) {
		return await this.attendeesRepository.findOne({
			where: {
				event_id: event_id,
				user_id: user_id,
			},
			relations: {
				check_in: true,
				check_out: true,
				event: {
					check_in_dates: true,
					check_out_dates: true,
				},
				user: true,
			},
			select: {
				check_in: true,
				check_out: true,
				event: {
					title: true,
					check_in_dates: true,
					check_out_dates: true,
					start_date: true,
					end_date: true,
				},
				user: {
					created_at: true,
					updated_at: true,
					email: true,
					phone_number: true,
					name: true,
				},
			},
		});
	}

	async findOneByEventAndAttendeeId(event_id: string, attendee_id: string) {
		return await this.attendeesRepository.findOne({
			where: {
				event_id: event_id,
				id: attendee_id,
			},
			relations: {
				user: true,
				check_in: true,
				check_out: true,
				event: {
					check_in_dates: true,
					check_out_dates: true,
					third_party_software: true,
				},
			},
			select: {
				user: {
					name: true,
					phone_number: true,
					email: true,
					document: true,
				},
				check_in: {
					created_at: true,
					id: true,
				},
				check_out: {
					created_at: true,
					id: true,
				},
				event: {
					title: true,
					details: true,
					start_date: true,
					end_date: true,
					check_in_dates: true,
					check_out_dates: true,
					place_name: true,
					third_party_software: { name: true },
				},
			},
		});
	}

	async findAll(current_user: CurrentUser) {
		const queryBuilder = this.attendeesRepository.createQueryBuilder('attendee');

		queryBuilder
			.leftJoinAndSelect('attendee.check_in', 'check_in')
			.leftJoinAndSelect('attendee.check_out', 'check_out')
			.leftJoinAndSelect('attendee.event', 'event')
			.leftJoinAndSelect('event.check_in_dates', 'check_in_dates')
			.leftJoinAndSelect('event.check_out_dates', 'check_out_dates')
			.leftJoinAndSelect('attendee.user', 'user');

		if (!current_user.user.roles.includes(roles.master)) {
			queryBuilder
				.andWhere('event.created_by_login_id = :loginId', { loginId: current_user.user.loginId })
				.orWhere(':loginId = ANY(event.responsible_login_ids)', { loginId: current_user.user.loginId });
		}

		queryBuilder.select([
			'attendee',
			'check_in.created_at',
			'check_out.created_at',
			'event.title',
			'event.is_public',
			'event.start_date',
			'event.end_date',
			'event.created_by_login_id',
			'event.created_by',
			'event.responsible_login_ids',
			'event.third_party_software_id',
			'check_in_dates',
			'check_out_dates',
			'user.name',
			'user.email',
			'user.phone_number',
		]);

		queryBuilder.orderBy('attendee.created_at', 'DESC');

		return await queryBuilder.getMany();
	}

	async findAllByEventId(event_id: string) {
		return await this.attendeesRepository.find({
			where: {
				event_id: event_id,
			},
			relations: {
				check_in: true,
				check_out: true,
				event: {
					check_in_dates: true,
					check_out_dates: true,
				},
				user: true,
			},
			select: {
				check_in: {
					created_at: true,
				},
				check_out: {
					created_at: true,
				},
				event: {
					title: true,
					check_in_dates: true,
					check_out_dates: true,
					start_date: true,
					end_date: true,
					is_public: true,
					third_party_software_id: true,
				},
				user: {
					created_at: true,
					updated_at: true,
					email: true,
					phone_number: true,
					name: true,
				},
			},
			order: { user: { name: 'ASC' }, check_in: { created_at: 'ASC' } },
		});
	}
}
