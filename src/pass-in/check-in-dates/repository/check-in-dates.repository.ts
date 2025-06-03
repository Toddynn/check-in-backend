import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckInDatesDto } from '../models/dto/create-check-in-dates.dto';
import { UpdateCheckInDatesDto } from '../models/dto/update-check-in-dates.dto';
import { CheckInDates } from '../models/entities/check-in-dates.entity';
import { CheckInDatesRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class CheckInDatesRepository implements CheckInDatesRepositoryInterface {
	constructor(
		@InjectRepository(CheckInDates)
		private readonly checkInDatesRepository: Repository<CheckInDates>,
	) {}

	async create(createCheckInDatesDto: CreateCheckInDatesDto) {
		await this.checkInDatesRepository.save(createCheckInDatesDto);
	}

	async update(id: string, updateCheckInDatesDto: UpdateCheckInDatesDto) {
		return await this.checkInDatesRepository.update(id, {
			end_date: updateCheckInDatesDto.end_date,
			start_date: updateCheckInDatesDto.start_date,
		});
	}

	async findOne(id: string) {
		return await this.checkInDatesRepository.findOne({ where: { id: id } });
	}

	async delete(id: string) {
		await this.checkInDatesRepository.delete(id);
	}
}
