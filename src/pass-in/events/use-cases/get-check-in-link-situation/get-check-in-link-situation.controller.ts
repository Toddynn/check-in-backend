import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { GetEventCheckInLinkSituationDocs } from './docs';
import { GetEventCheckInLinkSituationUseCase } from './get-check-in-link-situation.use-case';

@ApiTags('Events')
@IsPublic()
@Controller('events')
export class GetEventCheckInLinkSituationController {
	constructor(
		@Inject(GetEventCheckInLinkSituationUseCase)
		private readonly getEventCheckInLinkSituationUseCase: GetEventCheckInLinkSituationUseCase,
	) {}

	@Get(':id/check-in/validate')
	@GetEventCheckInLinkSituationDocs()
	async execute(@Param('id') id: string) {
		return await this.getEventCheckInLinkSituationUseCase.execute(id);
	}
}
