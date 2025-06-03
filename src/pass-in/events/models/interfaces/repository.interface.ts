import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { DefaultPaginatedResponse } from 'src/shared/interfaces/default-paginated-response';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { FindAllEventsQueryParams } from '../dto/find-all-events.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/events.entity';

export interface EventsRepositoryInterface {
	create(createEventDto: CreateEventDto, current_user: CurrentUser): Promise<Event>;
	findOne(id: string): Promise<Event>;
	findAll(query: FindAllEventsQueryParams, current_user: CurrentUser): Promise<DefaultPaginatedResponse<Array<Event>>>;
	findAllPublic({ page, quantity, search }: GenericPagination): Promise<[Event[], number]>;
	getTotalEventsByThirdPartySoftware(): Promise<{ software_name: string | null; total_events: number }[]>;
	update(id: string, updateEventDto: UpdateEventDto): Promise<UpdateResult>;
	delete(id: string): Promise<DeleteResult>;
}
