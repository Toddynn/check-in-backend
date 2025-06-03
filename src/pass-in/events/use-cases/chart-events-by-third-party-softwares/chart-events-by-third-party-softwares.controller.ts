import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GetTotalEventsByThirdPartySoftwareUseCase } from './chart-events-by-third-party-softwares.use-case';
import { GetTotalEventsByThirdPartySoftwareDocs } from './docs';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class GetTotalEventsByThirdPartySoftwareController {
	constructor(
		@Inject(GetTotalEventsByThirdPartySoftwareUseCase)
		private readonly getTotalEventsByThirdPartySoftwareUseCase: GetTotalEventsByThirdPartySoftwareUseCase,
	) {}

	@Get('/charts/third-party-softwares')
	@GetTotalEventsByThirdPartySoftwareDocs()
	async execute() {
		return await this.getTotalEventsByThirdPartySoftwareUseCase.execute();
	}
}
