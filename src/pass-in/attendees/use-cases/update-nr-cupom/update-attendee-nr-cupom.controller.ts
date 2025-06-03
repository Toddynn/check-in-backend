import { Body, Controller, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { UpdateAttendeeDto } from '../../models/dto/update-attendee.dto';
import { UpdateAttendeeNrCupomDocs } from './docs';
import { UpdateAttendeeNrCupomUseCase } from './update-attendee-nr-cupom.use-case';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Attendees')
@Controller('attendees')
export class UpdateAttendeeNrCupomController {
	constructor(
		@Inject(UpdateAttendeeNrCupomUseCase)
		private readonly updateAttendeeNrCupomUseCase: UpdateAttendeeNrCupomUseCase,
	) {}

	@Patch(':attendee_id')
	@UpdateAttendeeNrCupomDocs()
	async execute(@Param('attendee_id') attendee_id: string, @Body() updateAttendeeDto: UpdateAttendeeDto, @GetCurrentUser() currentUser: CurrentUser) {
		return await this.updateAttendeeNrCupomUseCase.execute(attendee_id, updateAttendeeDto, currentUser);
	}
}
