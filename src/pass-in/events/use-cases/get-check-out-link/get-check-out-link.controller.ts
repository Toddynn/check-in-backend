import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GetEventCheckOutLinkDocs } from './docs';
import { GetEventCheckOutLinkUseCase } from './get-check-out-link.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class GetEventCheckOutLinkController {
	constructor(
		@Inject(GetEventCheckOutLinkUseCase)
		private readonly getEventCheckOutLinkUseCase: GetEventCheckOutLinkUseCase,
	) {}

	@Get(':id/link/check-out')
	@GetEventCheckOutLinkDocs()
	async execute(@Param('id') id: string) {
		return await this.getEventCheckOutLinkUseCase.execute(id);
	}
}
