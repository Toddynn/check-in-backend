import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { appendFile, mkdir } from 'fs/promises';
import path from 'path';

@Injectable()
export class SendMailUseCase {
	constructor(private readonly mailerService: MailerService) {}

	async execute(options: ISendMailOptions) {
		try {
			await this.mailerService.sendMail(options);
		} catch (err) {
			await this.writeInLogArchive(`Falha ao enviar email para: ${options.to} - ${err.message}`);
		}
	}

	private messageMount(message: string): string {
		const date = new Date().toLocaleString();
		return `${date} - ${message}\r\n`;
	}

	private async writeInLogArchive(message: string) {
		const logPath = path.join(process.cwd(), 'logs');
		const errorLogFile = 'mailer-error.log';
		const errorLogFullPath = path.join(logPath, errorLogFile);

		try {
			await mkdir(logPath, { recursive: true });
			await appendFile(errorLogFullPath, this.messageMount(message), 'utf8');
		} catch (error) {
			console.error('Erro ao escrever log de e-mail:', error);
		}
	}
}
