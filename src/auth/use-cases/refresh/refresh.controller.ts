import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { RefreshDto } from 'src/auth/models/dto/refresh.dto';
import { RefreshDocs } from './docs';
import { RefreshUseCase } from './refresh.use-case';

@IsPublic()
@ApiTags('Auth')
@Controller()
export class RefreshController {
	constructor(
		@Inject(RefreshUseCase)
		private readonly refreshUseCase: RefreshUseCase,
	) {}

	@Post('/refresh')
	@RefreshDocs()
	async execute(@Body() refreshDto: RefreshDto) {
		return await this.refreshUseCase.execute(refreshDto);
	}
}
