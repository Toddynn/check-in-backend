import { Inject, Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import * as PDFDocument from 'pdfkit';
import { FindLastRecordByEventIdUseCase } from 'src/pass-in/records/use-cases/find-last-by-event-id/find-last-record-by-event-id.use-case';
import { FindOneEventWithAttendeesUseCase } from '../find-one-with-attendees/find-one-with-attendees.use-case';

@Injectable()
export class GenerateEventReportUseCase {
	constructor(
		@Inject(FindOneEventWithAttendeesUseCase)
		private readonly findOneEventWithAttendeesUseCase: FindOneEventWithAttendeesUseCase,
		@Inject(FindLastRecordByEventIdUseCase)
		private readonly findLastRecordByEventIdUseCase: FindLastRecordByEventIdUseCase,
	) {}

	async execute(event_id: string): Promise<{ filename: string; data: Buffer }> {
		const event = await this.findOneEventWithAttendeesUseCase.execute(event_id);
		const last_record = await this.findLastRecordByEventIdUseCase.execute(event.id);

		const actual_moment = format(new Date(), `dd/MM/yyyy 'às' HH:mm:ss`);

		const doc = new PDFDocument();
		const buffers = [];

		doc.font('Helvetica-Bold').fontSize(20).text('Relatório do Evento', { align: 'center' });
		doc.font('Helvetica');
		doc.fontSize(10).text(`Gerado em: ${format(new Date(), `dd/MM/yyyy 'às' HH:mm:ss`)}`, { align: 'center' });
		doc.moveDown();
		doc.fontSize(12).text(`Título: ${event.title}`);
		doc.text(`Detalhes: ${event.details}`);
		doc.moveDown();
		doc.text(`Tipo: ${event.is_public ? 'Publico' : 'Privado'}`);
		doc.text(`Início: ${format(event.start_date, 'dd/MM/yyyy')}`);
		doc.text(`Fim: ${format(event.end_date, 'dd/MM/yyyy')}`);
		doc.moveDown();
		doc.text(`Criado por: ${event.created_by}`);

		if (event.check_in_dates?.length > 0) {
			doc.moveDown();
			doc.text('Datas de Check-in:');
			for (const check_in of event.check_in_dates) {
				const formattedDate = format(check_in.start_date, 'dd/MM/yyyy');
				const formattedStartTime = format(check_in.start_date, 'HH:mm');
				const formattedEndTime = format(check_in.end_date, 'HH:mm');
				const checkInText = `(${formattedDate}) - libera em: ${formattedStartTime}, finaliza em: ${formattedEndTime}`;
				doc.text(checkInText);
			}
		} else {
			doc.moveDown();
			doc.fontSize(10).text(`Nenhuma data de check-in criada para o evento no momento desse relatório: ${actual_moment}`);
		}

		if (event.check_out_dates?.length > 0) {
			doc.moveDown();
			doc.text('Datas de Check-out:');
			for (const check_out of event.check_out_dates) {
				const formattedDate = format(check_out.start_date, 'dd/MM/yyyy');
				const formattedStartTime = format(check_out.start_date, 'HH:mm');
				const formattedEndTime = format(check_out.end_date, 'HH:mm');
				const checkOutText = `(${formattedDate}) - libera em: ${formattedStartTime}, finaliza em: ${formattedEndTime}`;
				doc.text(checkOutText);
			}
		} else {
			doc.moveDown();
			doc.fontSize(10).text(`Nenhuma data de check-out criada para o evento no momento desse relatório: ${actual_moment}`);
		}

		doc.moveDown();
		doc.fontSize(16).text('---------------------------------------------------------------------------------------', { align: 'left' });
		doc.moveDown();

		doc.moveDown();
		doc.fontSize(16).text('Ata do Evento', { align: 'center' });
		doc.moveDown();

		if (last_record) {
			// Acessa o conteúdo da ata
			const ataContent = JSON.parse(last_record.content as string);

			// Itera sobre os elementos da ata e insere no PDF
			for (const block of ataContent) {
				switch (block.type) {
					case 'h1':
						doc.fontSize(18)
							.font('Helvetica-Bold')
							.text(block.children.map((child) => child.text).join(' '), { align: block.align ?? 'left' });
						doc.moveDown();
						break;
					case 'h2':
						doc.fontSize(16)
							.font('Helvetica-Bold')
							.text(block.children.map((child) => child.text).join(' '), { align: block.align ?? 'left' });
						doc.moveDown();
						break;
					case 'h3':
						doc.fontSize(14)
							.font('Helvetica-Bold')
							.text(block.children.map((child) => child.text).join(' '), { align: block.align ?? 'left' });
						doc.moveDown();
						break;
					case 'p':
						doc.fontSize(12)
							.font('Helvetica')
							.text(block.children.map((child) => child.text).join(' '), { align: block.align ?? 'left' });
						doc.moveDown();
						break;
					case 'hr':
						doc.moveDown();
						break;
					default:
						doc.fontSize(12)
							.font('Helvetica')
							.text(block.children.map((child) => child.text).join(' '), { align: block.align ?? 'left' });
						doc.moveDown();
				}
			}

			doc.moveDown();
			doc.fontSize(10).text('Para uma melhor visualização, consulte no site.', { align: 'right' });
			//doc.fontSize(10).text('Por lá, também é possível consultar o histórico de atas.', { align: 'right' });
			doc.moveDown();
		} else {
			doc.moveDown();
			doc.fontSize(10).text(`Nenhuma ata criada para o evento no momento desse relatório: ${actual_moment}`);
			doc.moveDown();
		}

		doc.moveDown();
		doc.fontSize(16).text('---------------------------------------------------------------------------------------', { align: 'left' });
		doc.moveDown();

		doc.fontSize(16).text('Participantes', { align: 'center' });
		doc.fontSize(12).text('Total: ' + event.attendees.length, { align: 'left' });
		doc.moveDown();

		if (event.attendees?.length > 0) {
			for (const attendee of event.attendees) {
				doc.font('Helvetica-Bold').fontSize(14).text(`Nome: ${attendee.user.name}`);
				doc.font('Helvetica').fontSize(12);
				doc.text(`Email: ${attendee.user.email}`);
				doc.text(`Celular: ${attendee.user?.phone_number ?? '---'}`);
				if (attendee.check_in?.length > 0) {
					doc.moveDown();
					doc.text('Check-ins realizados:');
					for (const check_in of attendee.check_in) {
						const formattedCreatedAt = format(check_in.created_at, `dd/MM/yyyy 'às' HH:mm:ss`);
						const checkInText = `Feito em: ${formattedCreatedAt}`;
						doc.text(checkInText);
					}
				} else {
					doc.moveDown();
					doc.fontSize(10).text(`Nenhum check-in de ${attendee.user.name} registrado no momento desse relatório: ${actual_moment}`);
				}
				if (attendee.check_out?.length > 0) {
					doc.moveDown();
					doc.text('Check-outs realizados:');
					for (const check_out of attendee.check_out) {
						const formattedCreatedAt = format(check_out.created_at, `dd/MM/yyyy 'às' HH:mm:ss`);
						const checkOutText = `Feito em: ${formattedCreatedAt}`;
						doc.text(checkOutText);
					}
				} else {
					doc.moveDown();
					doc.fontSize(10).text(`Nenhum check-out de ${attendee.user.name} registrado no momento desse relatório: ${actual_moment}`);
				}
				doc.moveDown();
				doc.fontSize(16).text('---------------------------------------------------------------------------------------', { align: 'left' });
				doc.moveDown();
			}
		}

		doc.on('data', buffers.push.bind(buffers));
		return new Promise((resolve, reject) => {
			doc.on('end', () => {
				const pdfData = Buffer.concat(buffers);
				resolve({
					filename: 'Relatório-Evento.pdf',
					data: pdfData,
				});
			});
			doc.on('error', reject);
			doc.end();
		});
	}
}
