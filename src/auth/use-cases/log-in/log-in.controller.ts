import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { AuthDto } from 'src/auth/models/dto/auth.dto';
import { LogInDocs } from './docs';
import { LogInUseCase } from './log-in.use-case';

@IsPublic()
@ApiTags('Auth')
@Controller()
export class LogInController {
	constructor(
		@Inject(LogInUseCase)
		private readonly loginUseCase: LogInUseCase,
	) {}

	@Post('/login')
	@LogInDocs()
	async execute(@Body() authDto: AuthDto) {
		return await this.loginUseCase.execute(authDto);
	}
}
