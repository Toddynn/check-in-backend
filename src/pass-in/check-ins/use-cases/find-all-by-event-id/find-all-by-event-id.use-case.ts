import { Inject, Injectable } from '@nestjs/common';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CheckInsRepositoryInterface } from '../../models/interfaces/repository.interface';

@IsPublic()
@Injectable()
export class FindAllCheckInsByEventIdUseCase {
	constructor(@Inject('CheckInsRepositoryInterface') private readonly checkInsRepositoryInterface: CheckInsRepositoryInterface) {}
	async execute(event_id: string) {
		return await this.checkInsRepositoryInterface.findAllByEventId(event_id);
	}
}
