import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { UpdateEventDto } from 'src/pass-in/events/models/dto/update-event.dto';
import { UpdateEventDocs } from './docs';
import { UpdateEventUseCase } from './update.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class UpdateEventController {
	constructor(
		@Inject(UpdateEventUseCase)
		private readonly updateEventUseCase: UpdateEventUseCase,
	) {}

	@Patch(':id')
	@HttpCode(HttpStatus.OK)
	@UpdateEventDocs()
	async execute(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto, @GetCurrentUser() current_user: CurrentUser) {
		return await this.updateEventUseCase.execute(id, updateEventDto, current_user);
	}
}
