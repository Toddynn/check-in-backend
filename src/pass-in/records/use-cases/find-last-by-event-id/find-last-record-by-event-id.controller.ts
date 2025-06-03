import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindLastRecordByEventIdDocs } from './docs';
import { FindLastRecordByEventIdUseCase } from './find-last-record-by-event-id.use-case';

@ApiTags('Records')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('records')
export class FindLastRecordByEventIdController {
	constructor(
		@Inject(FindLastRecordByEventIdUseCase)
		private readonly findLastRecordByEventIdUseCase: FindLastRecordByEventIdUseCase,
	) {}

	@Get('/:event_id')
	@FindLastRecordByEventIdDocs()
	async execute(@Param('event_id') event_id: string) {
		return await this.findLastRecordByEventIdUseCase.execute(event_id);
	}
}
