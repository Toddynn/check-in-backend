import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindAllAttendeesDocs } from './docs';
import { FindAllAttendeesUseCase } from './find-all.use-case';

@ApiTags('Attendees')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attendees')
export class FindAllAttendeesController {
	constructor(
		@Inject(FindAllAttendeesUseCase)
		private readonly findAllAttendeesUseCase: FindAllAttendeesUseCase,
	) {}

	@Get()
	@FindAllAttendeesDocs()
	async execute(@GetCurrentUser() current_user: CurrentUser) {
		return await this.findAllAttendeesUseCase.execute(current_user);
	}
}
