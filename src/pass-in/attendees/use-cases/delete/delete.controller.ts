import { Controller, Delete, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { DeleteAttendeeUseCase } from './delete.use-case';
import { DeleteAttendeeDocs } from './docs';

@ApiTags('Attendees')
@ApiBearerAuth()
@Controller('attendees')
@UseGuards(JwtAuthGuard)
export class DeleteAttendeeController {
	constructor(
		@Inject(DeleteAttendeeUseCase)
		private readonly deleteAttendeeUseCase: DeleteAttendeeUseCase,
	) {}

	@Delete(':id')
	@DeleteAttendeeDocs()
	async execute(@Param('id') id: string, @GetCurrentUser() current_user: CurrentUser) {
		return await this.deleteAttendeeUseCase.execute(id, current_user);
	}
}
