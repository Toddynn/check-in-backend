import { Controller, HttpException, HttpStatus, Inject, Param, Post, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { GetCurrentUser } from 'src/auth/models/decorators/get-current-user.decorator';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/models/interfaces/current-user';
import { multerOptionsFactory } from 'src/configs/multer.config';
import { FILE_KEY } from 'src/shared/utils/constants/file';
import { UploadEventMediaDocs } from './docs';
import { UploadEventMediaUseCase } from './upload-event-media.use-case';

@ApiTags('Medias')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class UploadEventMediaController {
	constructor(
		@Inject(UploadEventMediaUseCase)
		private readonly uploadEventMediaUseCase: UploadEventMediaUseCase,
	) {}

	@UseInterceptors(FilesInterceptor(FILE_KEY, undefined, multerOptionsFactory()))
	@Post('/event/:event_id')
	@UploadEventMediaDocs()
	async execute(
		@Param('event_id') event_id: string,
		@UploadedFiles() files: Array<Express.Multer.File>,
		@GetCurrentUser() current_user: CurrentUser,
		@Req() req: Request,
	) {
		if (req.body.fileValidationError) {
			throw new HttpException(req.body.fileValidationError, HttpStatus.NOT_ACCEPTABLE);
		}
		return await this.uploadEventMediaUseCase.execute(event_id, files, current_user);
	}
}
