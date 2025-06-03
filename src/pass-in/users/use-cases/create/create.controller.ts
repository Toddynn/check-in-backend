import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { CreateUserDto } from 'src/pass-in/users/models/dto/create-user.dto';
import { CreateUserUseCase } from './create.use-case';
import { CreateUserDocs } from './docs';

@ApiTags('Users')
@IsPublic()
@Controller('users')
export class CreateUserController {
	constructor(
		@Inject(CreateUserUseCase)
		private readonly createUserUseCase: CreateUserUseCase,
	) {}

	@Post()
	@CreateUserDocs()
	async execute(@Body() createUserDto: CreateUserDto) {
		return await this.createUserUseCase.execute(createUserDto);
	}
}
