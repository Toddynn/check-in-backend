import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { FindOneEventDocs } from './docs';
import { FindOneEventUseCase } from './find-one.use-case';

@ApiTags('Events')
@Controller('events')
@IsPublic()
export class FindOneEventController {
	constructor(
		@Inject(FindOneEventUseCase)
		private readonly findOneEventUseCase: FindOneEventUseCase,
	) {}

	@Get(':id')
	@FindOneEventDocs.public()
	async execute(@Param('id') id: string) {
		return await this.findOneEventUseCase.execute(id);
	}
}
