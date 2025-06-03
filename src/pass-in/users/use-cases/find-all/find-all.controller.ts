import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindAllUsersDocs } from './docs';
import { FindAllUsersUseCase } from './find-all.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class FindAllUsersController {
	constructor(
		@Inject(FindAllUsersUseCase)
		private readonly findAllUsersUseCase: FindAllUsersUseCase,
	) {}

	@Get()
	@FindAllUsersDocs()
	async execute() {
		return await this.findAllUsersUseCase.execute();
	}
}
