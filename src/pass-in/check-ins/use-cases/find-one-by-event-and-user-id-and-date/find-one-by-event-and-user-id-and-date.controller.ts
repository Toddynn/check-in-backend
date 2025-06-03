import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { FindOneCheckInByEventAndUserIdAndDateDocs } from './docs';
import { FindOneCheckInByEventAndUserIdAndDateUseCase } from './find-one-by-event-and-user-id-and-date.use-case';

@ApiTags('Check-in')
@Controller('check-in')
@IsPublic()
export class FindOneCheckInByEventAndUserIdAndDateController {
	constructor(
		@Inject(FindOneCheckInByEventAndUserIdAndDateUseCase)
		private readonly findOneCheckInByEventAndUserIdAndDateUseCase: FindOneCheckInByEventAndUserIdAndDateUseCase,
	) {}

	@Get('/:event_id/:user_id/:date')
	@FindOneCheckInByEventAndUserIdAndDateDocs()
	async execute(@Param('event_id') event_id: string, @Param('user_id') user_id: string, @Param('date') date: string) {
		return await this.findOneCheckInByEventAndUserIdAndDateUseCase.execute(event_id, user_id, new Date(date));
	}
}
