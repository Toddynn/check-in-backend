import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { GetEventSubscriptionLinkSituationDocs } from './docs';
import { GetEventSubscriptionLinkSituationUseCase } from './get-subscription-link-situation.use-case';

@ApiTags('Events')
@Controller('events')
export class GetEventSubscriptionLinkSituationController {
	constructor(
		@Inject(GetEventSubscriptionLinkSituationUseCase)
		private readonly getEventSubscriptionLinkSituationUseCase: GetEventSubscriptionLinkSituationUseCase,
	) {}

	@IsPublic()
	@Get(':id/validate')
	@GetEventSubscriptionLinkSituationDocs()
	async execute(@Param('id') id: string) {
		return await this.getEventSubscriptionLinkSituationUseCase.execute(id);
	}
}
