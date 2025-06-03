import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { Repository } from 'typeorm';
import { CreateRecordDto } from '../models/dto/create-record.dto';
import { Record } from '../models/entities/records.entity';
import { RecordsRepositoryInterface } from '../models/interfaces/repository.interface';

@Injectable()
export class RecordsRepository implements RecordsRepositoryInterface {
	constructor(
		@InjectRepository(Record)
		private readonly recordsRepository: Repository<Record>,
	) {}

	async createRecord(createRecordDto: CreateRecordDto, current_user: CurrentUser) {
		return await this.recordsRepository.save({ ...createRecordDto, created_by: current_user.user.nome, created_by_login_id: current_user.user.loginId });
	}

	async findLastRecordByEventId(event_id: string) {
		return await this.recordsRepository.findOne({ where: { event_id }, order: { created_at: 'DESC' } });
	}
}
