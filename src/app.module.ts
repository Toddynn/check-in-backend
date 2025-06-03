import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/models/guards/jwt-auth.guard';
import { mailer_config } from './configs/mailer.config';
import { multerOptionsFactory } from './configs/multer.config';
import { typeorm_config } from './configs/typeOrm.config';
import { winston_config } from './configs/winston.config';
import { CnpjValidator } from './decorators/validate-cnpj.decorator';
import { CpfValidator } from './decorators/validate-cpf.decorator';
import { DocumentValidator } from './decorators/validate-document.decorator';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { UUIDerrorInterceptor } from './interceptors/uuid-verify.interceptor';
import { AttendeesModule } from './pass-in/attendees/attendees.module';
import { CheckInDatesModule } from './pass-in/check-in-dates/check-in-dates.module';
import { CheckInsModule } from './pass-in/check-ins/check-ins.module';
import { CheckOutDatesModule } from './pass-in/check-out-dates/check-out-dates.module';
import { CheckOutsModule } from './pass-in/check-outs/check-outs.module';
import { EventsModule } from './pass-in/events/events.module';
import { FeedbackQuestionsModule } from './pass-in/feedback-questions/feedback-questions.module';
import { FeedbacksModule } from './pass-in/feedbacks/feedbacks.module';
import { MediasModule } from './pass-in/medias/medias.module';
import { RecordsModule } from './pass-in/records/records.module';
import { ThirdPartySoftwaresModule } from './pass-in/third-party-softwares/third-party-softwares.module';
import { UsersModule } from './pass-in/users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true,
		}),
		WinstonModule.forRoot(winston_config),
		TypeOrmModule.forRoot(typeorm_config),
		MailerModule.forRoot(mailer_config),
		MulterModule.registerAsync({
			useFactory: multerOptionsFactory,
		}),
		AuthModule,
		EventsModule,
		CheckInDatesModule,
		CheckOutDatesModule,
		ThirdPartySoftwaresModule,
		FeedbackQuestionsModule,
		FeedbacksModule,
		UsersModule,
		AttendeesModule,
		CheckInsModule,
		CheckOutsModule,
		RecordsModule,
		MediasModule,
		MailerModule,
	],
	exports: [CpfValidator, CnpjValidator, DocumentValidator],
	providers: [
		CpfValidator,
		CnpjValidator,
		DocumentValidator,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: UUIDerrorInterceptor,
		},
	],
})
export class AppModule {}
