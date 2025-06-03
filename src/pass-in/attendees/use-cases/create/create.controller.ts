import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CreateAttendeeDto } from '../../models/dto/create-attendee.dto';
import { CreateAttendeeUseCase } from './create.use-case';
import { CreateAttendeeDocs } from './docs';

@IsPublic()
@ApiTags('Attendees')
@Controller('attendees')
export class CreateAttendeeController {
	constructor(
		@Inject(CreateAttendeeUseCase)
		private readonly createAttendeeUseCase: CreateAttendeeUseCase,
	) {}

	@Post()
	@CreateAttendeeDocs()
	async execute(@Body() createAttendeeDto: CreateAttendeeDto) {
		return await this.createAttendeeUseCase.execute(createAttendeeDto);
	}
}
