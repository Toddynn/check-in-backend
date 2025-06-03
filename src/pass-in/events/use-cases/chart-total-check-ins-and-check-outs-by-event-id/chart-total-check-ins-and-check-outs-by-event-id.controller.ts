import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { GetChartTotalCheckInsAndCheckOutsByEventIdUseCase } from './chart-total-check-ins-and-check-outs-by-event-id.use-case';
import { GetChartTotalCheckInsAndCheckOutsByEventIdDocs } from './docs';

@ApiTags('Events')
@Controller('events')
export class GetChartTotalCheckInsAndCheckOutsByEventIdController {
	constructor(
		@Inject(GetChartTotalCheckInsAndCheckOutsByEventIdUseCase)
		private readonly getChartTotalCheckInsAndCheckOutsByEventIdUseCase: GetChartTotalCheckInsAndCheckOutsByEventIdUseCase,
	) {}

	@IsPublic()
	@Get('/:id/charts/check-ins')
	@GetChartTotalCheckInsAndCheckOutsByEventIdDocs()
	async execute(@Param('id') id: string) {
		return await this.getChartTotalCheckInsAndCheckOutsByEventIdUseCase.execute(id);
	}
}
