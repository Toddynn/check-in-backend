import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { FindOneEventDocs } from './docs';
import { FindOneEventUseCase } from './find-one.use-case';

@ApiTags('Events')
@Controller('events')
@UseGuards(JwtAuthGuard)
export class AdminFindOneEventController {
	constructor(
		@Inject(FindOneEventUseCase)
		private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	@Get(':id/admin')
	@FindOneEventDocs.admin()
	async execute(@Param('id') id: string, @GetCurrentUser() current_user: CurrentUser) {
		return await this.findOneEventUseCase.execute(id, current_user);
	}
}
