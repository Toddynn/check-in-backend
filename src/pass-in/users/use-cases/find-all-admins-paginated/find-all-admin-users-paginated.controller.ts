import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { FindAllAdminUsersPaginatedDocs } from './docs';
import { FindAllAdminUsersPaginatedUseCase } from './find-all-admin-users-paginated.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class FindAllAdminUsersPaginatedController {
	constructor(
		@Inject(FindAllAdminUsersPaginatedUseCase)
		private readonly findAllAdminUsersPaginatedUseCase: FindAllAdminUsersPaginatedUseCase,
	) {}

	@Get('/admins/paginated')
	@FindAllAdminUsersPaginatedDocs()
	async execute(@Query() query: GenericPagination) {
		return await this.findAllAdminUsersPaginatedUseCase.execute(query);
	}
}
