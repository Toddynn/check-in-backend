import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { join } from 'path';
import { AppModule } from './app.module';
import { ensureDirectoriesExist } from './configs/multer.config';
import { MEDIA_FILES_DEST } from './shared/utils/constants/file';

const favIcon =
	'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM1MDlkNDUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1xci1jb2RlIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiB4PSIzIiB5PSIzIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHg9IjE2IiB5PSIzIiByeD0iMSIvPjxyZWN0IHdpZHRoPSI1IiBoZWlnaHQ9IjUiIHg9IjMiIHk9IjE2IiByeD0iMSIvPjxwYXRoIGQ9Ik0yMSAxNmgtM2EyIDIgMCAwIDAtMiAydjMiLz48cGF0aCBkPSJNMjEgMjF2LjAxIi8+PHBhdGggZD0iTTEyIDd2M2EyIDIgMCAwIDEtMiAySDciLz48cGF0aCBkPSJNMyAxMmguMDEiLz48cGF0aCBkPSJNMTIgM2guMDEiLz48cGF0aCBkPSJNMTIgMTZ2LjAxIi8+PHBhdGggZD0iTTE2IDEyaDEiLz48cGF0aCBkPSJNMjEgMTJ2LjAxIi8+PHBhdGggZD0iTTEyIDIxdi0xIi8+PC9zdmc+';

async function bootstrap() {
	ensureDirectoriesExist();

	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	);
	app.enableCors();

	app.useStaticAssets(join(__dirname, '..', MEDIA_FILES_DEST), {
		index: false,
		prefix: `/${MEDIA_FILES_DEST}`,
	});

	if (process.env.PRODUCTION === 'false') {
		const config = new DocumentBuilder().setTitle('Pass-in').setDescription('Pass-in API documentation').setVersion('1.0').build();

		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup('api', app, document, {
			customfavIcon: favIcon,
			customSiteTitle: 'API / Pass-in',
		});

		app.use(
			'/reference',
			apiReference({
				spec: {
					content: document,
				},
			}),
		);
	}

	await app.listen(parseInt(process.env.APP_PORT, 10) || 3000, '0.0.0.0');
}
bootstrap();
