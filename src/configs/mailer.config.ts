import { MailerOptions } from '@nestjs-modules/mailer';

export const mailer_config: MailerOptions = {
	transport: {
		host: process.env.MAIL_HOST,
		secure: !process.env.MAIL_USERNAME,
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD,
		},
		port: +process.env.MAIL_PORT,
		ignoreTLS: !!process.env.MAIL_IGNORE_TLS,
	},
	defaults: {
		from: process.env.MAIL_DEFAULT_FROM,
	},
};
