import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckInDto } from '../models/dto/create-check-in-dto';
import { CheckIn } from '../models/entities/check-in.entity';
import { CheckInsRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class CheckInsRepository implements CheckInsRepositoryInterface {
	constructor(
		@InjectRepository(CheckIn)
		private readonly checkInsRepository: Repository<CheckIn>,
	) {}

	async create(createCheckInDto: CreateCheckInDto) {
		await this.checkInsRepository.save(createCheckInDto);
	}

	async findAllByEventId(event_id: string) {
		return await this.checkInsRepository.findAndCount({
			where: {
				attendee: {
					event_id: event_id,
				},
			},
		});
	}

	async findOne(attendee_id: string) {
		return await this.checkInsRepository.findOne({ where: { attendee_id } });
	}
}
