import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckOutDatesDto } from '../models/dto/create-check-out-dates.dto';
import { UpdateCheckOutDatesDto } from '../models/dto/update-check-out-dates.dto';
import { CheckOutDates } from '../models/entities/check-out-dates.entity';
import { CheckOutDatesRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class CheckOutDatesRepository implements CheckOutDatesRepositoryInterface {
	constructor(
		@InjectRepository(CheckOutDates)
		private readonly checkOutDatesRepository: Repository<CheckOutDates>,
	) {}

	async create(createCheckOutDatesDto: CreateCheckOutDatesDto) {
		await this.checkOutDatesRepository.save(createCheckOutDatesDto);
	}

	async update(id: string, updateCheckOutDatesDto: UpdateCheckOutDatesDto) {
		return await this.checkOutDatesRepository.update(id, {
			end_date: updateCheckOutDatesDto.end_date,
			start_date: updateCheckOutDatesDto.start_date,
		});
	}

	async findOne(id: string) {
		return await this.checkOutDatesRepository.findOne({ where: { id: id } });
	}

	async findAllByEventId(event_id: string) {
		return await this.checkOutDatesRepository.find({ where: { event_id: event_id } });
	}

	async delete(id: string) {
		await this.checkOutDatesRepository.delete(id);
	}
}
