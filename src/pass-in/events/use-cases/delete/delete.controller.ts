import { Controller, Delete, HttpCode, HttpStatus, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { DeleteEventUseCase } from './delete.use-case';
import { DeleteEventDocs } from './docs';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class DeleteEventController {
	constructor(
		@Inject(DeleteEventUseCase)
		private readonly deleteEventUseCase: DeleteEventUseCase,
	) {}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	@DeleteEventDocs()
	async execute(@Param('id') id: string, @GetCurrentUser() current_user: CurrentUser) {
		return await this.deleteEventUseCase.execute(id, current_user);
	}
}
