import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { CreateEventDto } from '../../models/dto/create-event.dto';
import { CreateEventUseCase } from './create.use-case';
import { CreateEventDocs } from './docs';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('events')
export class CreateEventController {
	constructor(
		@Inject(CreateEventUseCase)
		private readonly createEventUseCase: CreateEventUseCase,
	) {}

	@Post()
	@CreateEventDocs()
	async execute(@Body() createEventDto: CreateEventDto, @GetCurrentUser() current_user: CurrentUser) {
		return await this.createEventUseCase.execute(createEventDto, current_user);
	}
}
