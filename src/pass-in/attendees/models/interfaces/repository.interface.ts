import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { UpdateAttendeeDto } from '../dto/update-attendee.dto';
import { Attendee } from '../entities/attendee.entity';

export interface AttendeesRepositoryInterface {
	create(event_id: string, user_id: string, nr_cupom?: string): Promise<void>;
	update(id: string, updateAttendeeDto: UpdateAttendeeDto): Promise<void>;
	delete(id: string): Promise<void>;
	findOne(id: string): Promise<Attendee>;
	findOneByEventAndUserId(event_id: string, user_id: string): Promise<Attendee>;
	findOneByEventIdAndNrCupom(event_id: string, nr_cupom: string): Promise<Attendee>;
	findOneByEventAndAttendeeId(event_id: string, attendee_id: string): Promise<Attendee>;
	findAll(current_user: CurrentUser): Promise<Attendee[]>;
	findAllByEventId(event_id: string): Promise<Attendee[]>;
}
