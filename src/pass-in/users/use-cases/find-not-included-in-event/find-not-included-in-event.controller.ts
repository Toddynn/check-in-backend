import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindNotIncludedUsersInEventDocs } from './docs';
import { FindNotIncludedUsersInEventUseCase } from './find-not-included-in-event.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class FindNotIncludedUsersInEventController {
	constructor(
		@Inject(FindNotIncludedUsersInEventUseCase)
		private readonly findNotIncludedUsersInEventUseCase: FindNotIncludedUsersInEventUseCase,
	) {}

	@Get('/event/:event_id')
	@FindNotIncludedUsersInEventDocs()
	async execute(@Param('event_id') event_id: string) {
		return await this.findNotIncludedUsersInEventUseCase.execute(event_id);
	}
}
