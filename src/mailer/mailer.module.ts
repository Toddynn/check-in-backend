import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendMailUseCase } from './use-cases/send-mail.use-case';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
	],
	providers: [SendMailUseCase],
	exports: [SendMailUseCase],
})
export class MailerModule {}
