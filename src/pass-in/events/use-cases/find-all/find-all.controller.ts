import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { DefaultQueryParamsDocs } from 'src/shared/utils/reference-decorators/default-query-params';
import { FindAllEventsQueryParams } from '../../models/dto/find-all-events.dto';
import { FindAllEventsDocs } from './docs';
import { FindAllEventsUseCase } from './find-all.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class FindAllEventsController {
	constructor(
		@Inject(FindAllEventsUseCase)
		private readonly findAllEventsUseCase: FindAllEventsUseCase,
	) {}

	@Get()
	@FindAllEventsDocs()
	@DefaultQueryParamsDocs()
	async execute(@Query() query: FindAllEventsQueryParams, @GetCurrentUser() current_user: CurrentUser) {
		return await this.findAllEventsUseCase.execute(query, current_user);
	}
}
