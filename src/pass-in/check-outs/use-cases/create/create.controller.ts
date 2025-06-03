import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CreateCheckOutDto } from '../../models/dto/create-check-out-dto';
import { CheckOut } from '../../models/entities/check-outs.entity';
import { CreateCheckOutUseCase } from './create.use-case';

@IsPublic()
@ApiTags('Check-out')
@Controller('check-out')
export class CreateCheckOutController {
	constructor(
		@Inject(CreateCheckOutUseCase)
		private readonly createCheckOutUseCase: CreateCheckOutUseCase,
	) {}

	@Post()
	@ApiOperation({ summary: 'Create a new check-out' })
	@ApiBody({ type: CreateCheckOutDto })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'The check-out has been successfully created.',
		type: CheckOut,
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input, object invalid.',
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'Unauthorized',
	})
	async execute(@Body() createCheckOutDto: CreateCheckOutDto) {
		return await this.createCheckOutUseCase.execute(createCheckOutDto);
	}
}
