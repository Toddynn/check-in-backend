export const FILE_KEY = 'file';

export const ACCEPTED_FILE_TYPES = {
	image: {
		mimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'image/heic', 'image/heif'],
		extensions: ['.png', '.jpeg', '.jpg', '.gif', '.webp', '.heic', '.heif'],
	},
	video: {
		mimeTypes: ['video/mp4', 'video/avi', 'video/mov', 'video/webm'],
		extensions: ['.mp4', '.avi', '.mov', '.webm'],
	},
	pdf: {
		mimeTypes: ['application/pdf'],
		extensions: ['.pdf'],
	},
};

export const ALL_VALID_MIME_TYPES = [...ACCEPTED_FILE_TYPES.image.mimeTypes, ...ACCEPTED_FILE_TYPES.video.mimeTypes, ...ACCEPTED_FILE_TYPES.pdf.mimeTypes];

export const APP_URL = process.env.APP_URL;
export const MEDIA_FILES_DEST = process.env.MEDIA_FILES_DEST;
export const EVENT_VIDEO_PATH = `${MEDIA_FILES_DEST}/events/videos`;
export const EVENT_PHOTO_PATH = `${MEDIA_FILES_DEST}/events/photos`;
export const EVENT_PDF_PATH = `${MEDIA_FILES_DEST}/events/pdfs`;
