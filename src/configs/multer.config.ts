import { MulterModuleOptions } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ACCEPTED_FILE_TYPES, ALL_VALID_MIME_TYPES, EVENT_PDF_PATH, EVENT_PHOTO_PATH, EVENT_VIDEO_PATH } from 'src/shared/utils/constants/file';

export const ensureDirectoriesExist = () => {
	[EVENT_PHOTO_PATH, EVENT_VIDEO_PATH, EVENT_PDF_PATH].forEach((dir) => {
		if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
	});
};

const getDestination = (file: Express.Multer.File): string => {
	if (ACCEPTED_FILE_TYPES.image.mimeTypes.includes(file.mimetype)) return EVENT_PHOTO_PATH;
	if (ACCEPTED_FILE_TYPES.video.mimeTypes.includes(file.mimetype)) return EVENT_VIDEO_PATH;
	if (ACCEPTED_FILE_TYPES.pdf.mimeTypes.includes(file.mimetype)) return EVENT_PDF_PATH;
	throw new Error('Tipo de arquivo inválido');
};

export const multerOptionsFactory = (): MulterModuleOptions => {
	ensureDirectoriesExist();

	return {
		storage: diskStorage({
			destination: (_, file, cb) => {
				try {
					const path = getDestination(file);
					cb(null, path);
				} catch (error) {
					cb(error, null);
				}
			},
			filename: (_, file, cb) => {
				const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
				const ext = extname(file.originalname);
				cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
			},
		}),
		limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
		fileFilter: (req, file, cb) => {
			if (ALL_VALID_MIME_TYPES.includes(file.mimetype)) {
				cb(null, true);
			} else {
				req.body.fileValidationError = 'Tipo de arquivo inválido.';
				cb(null, false);
			}
		},
	};
};
