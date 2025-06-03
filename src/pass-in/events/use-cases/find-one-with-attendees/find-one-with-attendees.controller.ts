import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindOneEventWithAttendeesDocs } from './docs';
import { FindOneEventWithAttendeesUseCase } from './find-one-with-attendees.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class FindOneEventWithAttendeesController {
	constructor(
		@Inject(FindOneEventWithAttendeesUseCase)
		private readonly findOneEventWithAttendeesUseCase: FindOneEventWithAttendeesUseCase,
	) {}

	@Get(':id/attendees')
	@FindOneEventWithAttendeesDocs()
	async execute(@Param('id') id: string) {
		return await this.findOneEventWithAttendeesUseCase.execute(id);
	}
}
