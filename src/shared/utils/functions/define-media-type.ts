import { NotAcceptableException } from '@nestjs/common';
import { ACCEPTED_FILE_TYPES } from '../constants/file';

export async function defineMediaType(mimeType: string): Promise<'image' | 'video' | 'pdf'> {
	if (ACCEPTED_FILE_TYPES.image.mimeTypes.includes(mimeType)) return 'image';
	if (ACCEPTED_FILE_TYPES.video.mimeTypes.includes(mimeType)) return 'video';
	if (ACCEPTED_FILE_TYPES.pdf.mimeTypes.includes(mimeType)) return 'pdf';

	throw new NotAcceptableException({
		message: 'Tipo de arquivo inválido. Somente imagens, vídeos e PDFs são aceitos.',
	});
}
