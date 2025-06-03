import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { GetEventCheckOutLinkSituationDocs } from './docs';
import { GetEventCheckOutLinkSituationUseCase } from './get-check-out-link-situation.use-case';

@ApiTags('Events')
@IsPublic()
@Controller('events')
export class GetEventCheckOutLinkSituationController {
	constructor(
		@Inject(GetEventCheckOutLinkSituationUseCase)
		private readonly getEventCheckOutLinkSituationUseCase: GetEventCheckOutLinkSituationUseCase,
	) {}

	@Get(':id/check-out/validate')
	@GetEventCheckOutLinkSituationDocs()
	async execute(@Param('id') id: string) {
		return await this.getEventCheckOutLinkSituationUseCase.execute(id);
	}
}
