import { Controller, Delete, Inject, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { DeleteMediaUseCase } from './delete-media.use-case';
import { DeleteMediaDocs } from './docs';

@ApiTags('Medias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class DeleteMediaController {
	constructor(
		@Inject(DeleteMediaUseCase)
		private readonly deleteMediaUseCase: DeleteMediaUseCase,
	) {}

	@Delete('/:id')
	@DeleteMediaDocs()
	async execute(@Param('id') id: string, @GetCurrentUser() current_user: CurrentUser) {
		return await this.deleteMediaUseCase.execute(id, current_user);
	}
}
