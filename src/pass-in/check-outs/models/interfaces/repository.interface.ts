import { CreateCheckOutDto } from '../dto/create-check-out-dto';
import { CheckOut } from '../entities/check-outs.entity';

export interface CheckOutsRepositoryInterface {
	create(createCheckOutDto: CreateCheckOutDto): Promise<void>;
	findAllByEventId(event_id: string): Promise<[CheckOut[], number]>;
	findOne(attendee_id: string): Promise<CheckOut>;
}
