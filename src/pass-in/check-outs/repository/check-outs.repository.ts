import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckOutDto } from '../models/dto/create-check-out-dto';
import { CheckOut } from '../models/entities/check-outs.entity';
import { CheckOutsRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class CheckOutsRepository implements CheckOutsRepositoryInterface {
	constructor(
		@InjectRepository(CheckOut)
		private readonly checkOutsRepository: Repository<CheckOut>,
	) {}

	async create(createCheckOutDto: CreateCheckOutDto) {
		await this.checkOutsRepository.save(createCheckOutDto);
	}

	async findAllByEventId(event_id: string) {
		return await this.checkOutsRepository.findAndCount({
			where: {
				attendee: {
					event_id: event_id,
				},
			},
			relations: { attendee: true },
		});
	}

	async findOne(attendee_id: string) {
		return await this.checkOutsRepository.findOne({ where: { attendee_id } });
	}
}
