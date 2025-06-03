import { Controller, Get, HttpStatus, Inject, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CheckOut } from '../../models/entities/check-outs.entity';
import { FindOneCheckOutByEventAndUserIdAndDateUseCase } from './find-one-by-event-and-user-id-and-date.use-case';

@ApiTags('Check-out')
@Controller('check-out')
@IsPublic()
export class FindOneCheckOutByEventAndUserIdAndDateController {
	constructor(
		@Inject(FindOneCheckOutByEventAndUserIdAndDateUseCase)
		private readonly findOneCheckOutByEventAndUserIdAndDateUseCase: FindOneCheckOutByEventAndUserIdAndDateUseCase,
	) {}

	@Get('/:event_id/:user_id/:date')
	@ApiOperation({ summary: 'Find one check-out by event ID, user ID, and date' })
	@ApiParam({ name: 'event_id', description: 'ID of the event', type: String })
	@ApiParam({ name: 'user_id', description: 'ID of the user', type: String })
	@ApiParam({ name: 'date', description: 'Date of the check-out', type: String, format: 'date-time' })
	@ApiResponse({ status: HttpStatus.OK, description: 'Check-out found', type: CheckOut })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Check-out not found' })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid parameters' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
	async execute(@Param('event_id') event_id: string, @Param('user_id') user_id: string, @Param('date') date: string) {
		return await this.findOneCheckOutByEventAndUserIdAndDateUseCase.execute(event_id, user_id, new Date(date));
	}
}
