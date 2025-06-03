import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GetEventCheckInLinkDocs } from './docs';
import { GetEventCheckInLinkUseCase } from './get-check-in-link.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class GetEventCheckInLinkController {
	constructor(
		@Inject(GetEventCheckInLinkUseCase)
		private readonly getEventCheckInLinkUseCase: GetEventCheckInLinkUseCase,
	) {}

	@Get(':id/link/check-in')
	@GetEventCheckInLinkDocs()
	async execute(@Param('id') id: string) {
		return await this.getEventCheckInLinkUseCase.execute(id);
	}
}
