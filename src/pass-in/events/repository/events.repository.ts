import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { endOfMonth, format, startOfMonth, subDays } from 'date-fns';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { roles } from 'src/shared/utils/constants/roles';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { Brackets, ILike, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateEventDto } from '../models/dto/create-event.dto';
import { FindAllEventsQueryParams } from '../models/dto/find-all-events.dto';
import { UpdateEventDto } from '../models/dto/update-event.dto';
import { Event } from '../models/entities/events.entity';
import { EventsRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class EventsRepository implements EventsRepositoryInterface {
	constructor(
		@InjectRepository(Event)
		private readonly eventsRepository: Repository<Event>,
	) {}

	async create(createEventDto: CreateEventDto, current_user: CurrentUser) {
		return await this.eventsRepository.save({
			title: createEventDto.title,
			start_date: createEventDto.start_date,
			end_date: createEventDto.end_date,
			maximum_attendees: createEventDto.maximum_attendees,
			is_public: createEventDto.is_public,
			responsible_login_ids: createEventDto.responsible_login_ids,
			third_party_software_id: createEventDto.third_party_software_id,
			details: createEventDto.details,
			created_by: current_user.user.nome,
			created_by_login_id: current_user.user.loginId,
			external_link: createEventDto.external_link,
			lat: createEventDto.lat,
			lng: createEventDto.lng,
			place_url: createEventDto.place_url,
			place_id: createEventDto.place_id,
			formatted_address: createEventDto.formatted_address,
			place_name: createEventDto.place_name,
		});
	}

	async update(id: string, updateEventDto: UpdateEventDto) {
		return await this.eventsRepository.update(id, {
			title: updateEventDto.title,
			details: updateEventDto.details,
			start_date: updateEventDto.start_date,
			third_party_software_id: updateEventDto.third_party_software_id,
			end_date: updateEventDto.end_date,
			maximum_attendees: updateEventDto.maximum_attendees,
			is_public: updateEventDto.is_public,
			responsible_login_ids: updateEventDto.responsible_login_ids,
			external_link: updateEventDto.external_link,
			updated_at: new Date(),
			lat: updateEventDto.lat,
			lng: updateEventDto.lng,
			place_url: updateEventDto.place_url,
			place_id: updateEventDto.place_id,
			formatted_address: updateEventDto.formatted_address,
			place_name: updateEventDto.place_name,
			is_feedback_open: updateEventDto.is_feedback_open,
		});
	}

	async delete(id: string) {
		return await this.eventsRepository.delete(id);
	}

	async findOne(id: string) {
		return await this.eventsRepository.findOne({
			where: { id },
			relations: {
				check_in_dates: true,
				check_out_dates: true,
				third_party_software: true,
				feedback_questions: true,
			},
		});
	}

	async findAll(
		{ page = 1, quantity = 10, search, start_date, only_me = false, third_party_software_id }: FindAllEventsQueryParams,
		current_user: CurrentUser,
	) {
		const queryBuilder = this.eventsRepository.createQueryBuilder('events');

		queryBuilder
			.leftJoinAndSelect('events.check_in_dates', 'check_in_dates')
			.leftJoinAndSelect('events.check_out_dates', 'check_out_dates')
			.leftJoinAndSelect('events.third_party_software', 'third_party_software')
			.leftJoin('events.records', 'records')
			.addSelect(['records.id'])
			.groupBy('events.id, records.id, check_in_dates.id, check_out_dates.id, third_party_software.id');

		if (third_party_software_id) {
			queryBuilder.andWhere('events.third_party_software.id = :third_party_software_id', { third_party_software_id });
		}

		if (only_me && !current_user.user.roles.includes(roles.master)) {
			queryBuilder.andWhere(
				new Brackets((qb) => {
					qb.where('events.created_by_login_id = :loginId', { loginId: current_user.user.loginId }).orWhere(
						':loginId = ANY(events.responsible_login_ids)',
						{ loginId: current_user.user.loginId },
					);
				}),
			);
		}

		if (search) {
			const trimmed = search.trim();

			if (isUUID(trimmed)) {
				queryBuilder.andWhere('events.id = :id', { id: trimmed });
			} else {
				queryBuilder.andWhere('events.title ILIKE :search', { search: `%${trimmed}%` });
			}
		}

		if (start_date) {
			const firstDayOfMonth = format(startOfMonth(start_date), 'yyyy-MM-dd');
			const lastDayOfMonth = format(endOfMonth(start_date), 'yyyy-MM-dd');

			queryBuilder.andWhere('events.start_date BETWEEN :firstDayOfMonth AND :lastDayOfMonth', { firstDayOfMonth, lastDayOfMonth });
		}

		// Clonamos para contar o total antes de paginar
		const countQueryBuilder = queryBuilder.clone();

		const totalrows = await countQueryBuilder.getCount();
		const totalpages = Math.ceil(totalrows / quantity);
		const offset = (page - 1) * quantity;

		queryBuilder.orderBy('events.created_at', 'DESC');
		queryBuilder.skip(offset).take(quantity);

		const result_rows = await queryBuilder.getMany();

		return {
			total_rows: {
				limit: quantity,
				page,
				totalpages,
				totalrows,
			},
			result_rows,
		};
	}

	async findAllPublic({ page = 1, quantity = 10, search }: GenericPagination) {
		return await this.eventsRepository.findAndCount({
			skip: (page - 1) * quantity,
			take: quantity,
			where: {
				title: ILike(`%${search?.trim() ?? ''}%`),
				end_date: MoreThanOrEqual(subDays(new Date(), 7)),
				is_public: true,
			},
			order: {
				created_at: {
					direction: 'DESC',
				},
			},
			relations: {
				check_in_dates: true,
				check_out_dates: true,
				third_party_software: true,
			},
		});
	}

	async getTotalEventsByThirdPartySoftware() {
		const events = await this.eventsRepository.find({
			relations: {
				third_party_software: true,
			},
		});

		const groupedMap = new Map<string | null, number>();

		for (const event of events) {
			const softwareName = event.third_party_software?.name ?? null;
			groupedMap.set(softwareName, (groupedMap.get(softwareName) || 0) + 1);
		}

		return Array.from(groupedMap.entries()).map(([software_name, total_events]) => ({
			software_name,
			total_events,
		}));
	}
}
