import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GetEventSubscriptionLinkDocs } from './docs';
import { GetEventSubscriptionLinkUseCase } from './get-subscription-link.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class GetEventSubscriptionLinkController {
	constructor(
		@Inject(GetEventSubscriptionLinkUseCase)
		private readonly getEventSubscriptionLinkUseCase: GetEventSubscriptionLinkUseCase,
	) {}

	@Get(':id/link/subscription')
	@GetEventSubscriptionLinkDocs()
	async execute(@Param('id') id: string) {
		return await this.getEventSubscriptionLinkUseCase.execute(id);
	}
}
