import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindOneAttendeeDocs } from './docs';
import { FindOneAttendeeUseCase } from './find-one.use-case';

@ApiTags('Attendees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attendees')
export class FindOneAttendeeController {
	constructor(
		@Inject(FindOneAttendeeUseCase)
		private readonly findOneAttendeeUseCase: FindOneAttendeeUseCase,
	) {}

	@Get(':id')
	@FindOneAttendeeDocs()
	async execute(@Param('id') id: string) {
		return await this.findOneAttendeeUseCase.execute(id);
	}
}
