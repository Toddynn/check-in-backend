import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CreateCheckInDto } from '../../models/dto/create-check-in-dto';
import { CreateCheckInUseCase } from './create.use-case';
import { CreateCheckInDocs } from './docs';

@IsPublic()
@ApiTags('Check-in')
@Controller('check-in')
export class CreateCheckInController {
	constructor(
		@Inject(CreateCheckInUseCase)
		private readonly createCheckInUseCase: CreateCheckInUseCase,
	) {}

	@Post()
	@CreateCheckInDocs()
	async execute(@Body() createCheckInDto: CreateCheckInDto) {
		return await this.createCheckInUseCase.execute(createCheckInDto);
	}
}
