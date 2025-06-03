import { UpdateResult } from 'typeorm';
import { CreateCheckInDatesDto } from '../dto/create-check-in-dates.dto';
import { UpdateCheckInDatesDto } from '../dto/update-check-in-dates.dto';
import { CheckInDates } from '../entities/check-in-dates.entity';

export interface CheckInDatesRepositoryInterface {
	create(createCheckInDatesDto: CreateCheckInDatesDto): Promise<void>;
	update(id: string, updateEventDto: UpdateCheckInDatesDto): Promise<UpdateResult>;
	findOne(id: string): Promise<CheckInDates>;
	delete(id: string): Promise<void>;
}
