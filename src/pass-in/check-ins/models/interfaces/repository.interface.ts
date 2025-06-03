import { CreateCheckInDto } from '../dto/create-check-in-dto';
import { CheckIn } from '../entities/check-in.entity';

export interface CheckInsRepositoryInterface {
	create(createCheckInDto: CreateCheckInDto): Promise<void>;
	findAllByEventId(event_id: string): Promise<[CheckIn[], number]>;
	findOne(attendee_id: string): Promise<CheckIn>;
}
