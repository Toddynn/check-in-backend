import { Address } from 'nodemailer/lib/mailer';

export interface SendMailDto {
	from?: Address;
	recipients: Address[];
	subject: string;
	html: string;
	text?: string;
	placeholderReplacements?: Record<string, string>;
}
