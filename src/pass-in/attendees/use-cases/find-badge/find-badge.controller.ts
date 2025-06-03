import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { FindAttendeeBadgeDocs } from './docs';
import { FindAttendeeBadgeUseCase } from './find-badge.use-case';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Attendees')
@IsPublic()
@Controller('attendees')
export class FindAttendeeBadgeController {
	constructor(
		@Inject(FindAttendeeBadgeUseCase)
		private readonly findAttendeeBadgeUseCase: FindAttendeeBadgeUseCase,
	) {}

	@Get('/badge/:attendee_id/:event_id')
	@FindAttendeeBadgeDocs()
	async execute(@Param('attendee_id') attendee_id: string, @Param('event_id') event_id: string) {
		return await this.findAttendeeBadgeUseCase.execute(attendee_id, event_id);
	}
}
