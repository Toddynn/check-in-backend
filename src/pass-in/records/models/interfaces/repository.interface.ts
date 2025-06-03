import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateRecordDto } from '../dto/create-record.dto';
import { Record } from '../entities/records.entity';

export interface RecordsRepositoryInterface {
	createRecord(createRecordDto: CreateRecordDto, current_user: CurrentUser): Promise<CreateRecordDto & Record>;
	findLastRecordByEventId(event_id: string): Promise<Record>;
}
