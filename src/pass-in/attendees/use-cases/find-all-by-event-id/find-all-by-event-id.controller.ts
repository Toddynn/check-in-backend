import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindAllAttendeesByEventIdDocs } from './docs';
import { FindAllAttendeesByEventIdUseCase } from './find-all-by-event-id.use-case';

@ApiTags('Attendees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attendees')
export class FindAllAttendeesByEventIdController {
	constructor(
		@Inject(FindAllAttendeesByEventIdUseCase)
		private readonly findAllAttendeesByEventIdUseCase: FindAllAttendeesByEventIdUseCase,
	) {}

	@Get('/event/:event_id')
	@FindAllAttendeesByEventIdDocs()
	async execute(@Param('event_id') event_id: string) {
		return await this.findAllAttendeesByEventIdUseCase.execute(event_id);
	}
}
