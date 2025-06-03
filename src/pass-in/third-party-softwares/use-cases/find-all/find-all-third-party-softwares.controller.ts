import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GenericPagination } from 'src/shared/utils/dto/generic-pagination';
import { FindAllThirdPartySoftwaresDocs } from './docs';
import { FindAllThirdPartySoftwaresUseCase } from './find-all-third-party-softwares.use-case';

@ApiTags('Third party softwares')
@ApiBearerAuth()
@Controller('third-party-softwares')
@UseGuards(JwtAuthGuard)
export class FindAllThirdPartySoftwaresController {
	constructor(
		@Inject(FindAllThirdPartySoftwaresUseCase)
		private readonly findAllThirdPartySoftwaresUseCase: FindAllThirdPartySoftwaresUseCase,
	) {}

	@Get()
	@FindAllThirdPartySoftwaresDocs()
	async execute(@Query() query: GenericPagination) {
		return await this.findAllThirdPartySoftwaresUseCase.execute(query);
	}
}
