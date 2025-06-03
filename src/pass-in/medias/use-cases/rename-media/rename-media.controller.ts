import { Body, Controller, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { RenameMediaDto } from '../../models/dto/rename-media.dto';
import { RenameMediaDocs } from './docs';
import { RenameMediaUseCase } from './rename-media.use-case';

@ApiTags('Medias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class RenameMediaController {
	constructor(
		@Inject(RenameMediaUseCase)
		private readonly renameMediaUseCase: RenameMediaUseCase,
	) {}

	@Patch('/:id')
	@RenameMediaDocs()
	async execute(@Param('id') id: string, @Body() rename_media_dto: RenameMediaDto) {
		return await this.renameMediaUseCase.execute(id, rename_media_dto);
	}
}
