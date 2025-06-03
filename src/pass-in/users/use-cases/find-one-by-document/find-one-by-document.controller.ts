import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { ThrowHandlingStrategy } from 'src/shared/utils/functions/handle-error';
import { FindOneUserByDocumentDocs } from './docs';
import { FindOneUserByDocumentUseCase } from './find-one-by-document.use-case';

@ApiTags('Users')
@IsPublic()
@Controller('users')
export class FindOneUserByDocumentController {
	constructor(
		@Inject(FindOneUserByDocumentUseCase)
		private readonly findOneUserByDocumentUseCase: FindOneUserByDocumentUseCase,
	) {}

	@Get(':document')
	@FindOneUserByDocumentDocs()
	async execute(@Param('document') document: string) {
		return await this.findOneUserByDocumentUseCase.execute(document, ThrowHandlingStrategy.THROW_NOT_FOUND);
	}
}
