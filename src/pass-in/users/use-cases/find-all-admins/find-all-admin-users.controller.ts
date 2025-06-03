import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { FindAllAdminUsersDocs } from './docs';
import { FindAllAdminUsersUseCase } from './find-all-admin-users.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class FindAllAdminUsersController {
	constructor(
		@Inject(FindAllAdminUsersUseCase)
		private readonly findAllAdminUsersUseCase: FindAllAdminUsersUseCase,
	) {}

	@Get('/admins/unpaginated')
	@FindAllAdminUsersDocs()
	async execute() {
		return await this.findAllAdminUsersUseCase.execute();
	}
}
