import { Inject, Injectable } from '@nestjs/common';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CheckOutsRepositoryInterface } from '../../models/interfaces/repository.interface';

@IsPublic()
@Injectable()
export class FindAllCheckOutsByEventIdUseCase {
	constructor(@Inject('CheckOutsRepositoryInterface') private readonly checkOutsRepositoryInterface: CheckOutsRepositoryInterface) {}
	async execute(event_id: string) {
		return await this.checkOutsRepositoryInterface.findAllByEventId(event_id);
	}
}
