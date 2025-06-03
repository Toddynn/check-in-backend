import { UpdateResult } from 'typeorm';
import { CreateCheckOutDatesDto } from '../dto/create-check-out-dates.dto';
import { UpdateCheckOutDatesDto } from '../dto/update-check-out-dates.dto';
import { CheckOutDates } from '../entities/check-out-dates.entity';

export interface CheckOutDatesRepositoryInterface {
	create(createCheckOutDatesDto: CreateCheckOutDatesDto): Promise<void>;
	update(id: string, updateEventDto: UpdateCheckOutDatesDto): Promise<UpdateResult>;
	findOne(id: string): Promise<CheckOutDates>;
	findAllByEventId(event_id: string): Promise<CheckOutDates[]>;
	delete(id: string): Promise<void>;
}
