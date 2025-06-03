import { Controller, Delete, HttpCode, HttpStatus, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { LogOutDocs } from './docs';
import { LogOutUseCase } from './log-out.use-case';

@ApiTags('Auth')
@UseGuards(JwtAuthGuard)
@Controller()
export class LogOutController {
	constructor(
		@Inject(LogOutUseCase)
		private readonly logOutUseCase: LogOutUseCase,
	) {}

	@Delete('/token')
	@HttpCode(HttpStatus.OK)
	@LogOutDocs()
	async execute(@GetCurrentUser() current_user: CurrentUser) {
		await this.logOutUseCase.execute(current_user.token);
	}
}
