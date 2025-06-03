import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { FindAttendeeByEventAndUserDocs } from './docs';
import { FindOneAttendeeByEventAndUserIdUseCase } from './find-one-by-event-and-user-id.use-case';

@IsPublic()
@ApiTags('Attendees')
@Controller('attendees')
export class FindOneAttendeeByEventAndUserIdController {
	constructor(
		@Inject(FindOneAttendeeByEventAndUserIdUseCase)
		private readonly findOneAttendeeByEventAndUserIdUseCase: FindOneAttendeeByEventAndUserIdUseCase,
	) {}

	@Get('/event/:event_id/:user_id')
	@FindAttendeeByEventAndUserDocs()
	async execute(@Param('event_id') event_id: string, @Param('user_id') user_id: string) {
		return await this.findOneAttendeeByEventAndUserIdUseCase.execute(event_id, user_id, ThrowHandlingStrategy.THROW_NOT_FOUND);
	}
}
