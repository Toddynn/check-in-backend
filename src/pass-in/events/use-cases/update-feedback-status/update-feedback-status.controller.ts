import { Body, Controller, HttpCode, HttpStatus, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { UpdateEventDto } from '../../models/dto/update-event.dto';
import { UpdateEventFeedbackStatusDocs } from './docs';
import { UpdateEventFeedbackStatusUseCase } from './update-feedback-status.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class UpdateEventFeedbackStatusController {
	constructor(
		@Inject(UpdateEventFeedbackStatusUseCase)
		private readonly updateEventFeedbackStatusUseCase: UpdateEventFeedbackStatusUseCase,
	) {}

	@Patch('/feedback-status/:id')
	@HttpCode(HttpStatus.OK)
	@UpdateEventFeedbackStatusDocs()
	async execute(@Param('id') id: string, @Body() updateEventDto: Pick<UpdateEventDto, 'is_feedback_open'>, @GetCurrentUser() current_user: CurrentUser) {
		return await this.updateEventFeedbackStatusUseCase.execute(id, updateEventDto, current_user);
	}
}
