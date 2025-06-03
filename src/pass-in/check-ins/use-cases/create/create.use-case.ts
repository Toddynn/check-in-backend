import { HttpException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { format, isWithinInterval } from 'date-fns';
import { SendMailUseCase } from 'src/mailer/use-cases/send-mail.use-case';
import { Attendee } from 'src/pass-in/attendees/models/entities/attendee.entity';
import { FindOneAttendeeByEventAndAttendeeIdUseCase } from 'src/pass-in/attendees/use-cases/find-one-by-event-and-attendee-id/find-one-by-event-and-attendee-id.use-case';
import { Event } from 'src/pass-in/events/models/entities/events.entity';
import { FindOneEventUseCase } from 'src/pass-in/events/use-cases/find-one/find-one.use-case';
import { logoUrl } from 'src/shared/utils/constants/pormade-logo';
import { CreateCheckInDto } from '../../models/dto/create-check-in-dto';
import { CheckInsRepositoryInterface } from '../../models/interfaces/repository.interface';
import { FindOneCheckInByEventAndUserIdAndDateUseCase } from '../find-one-by-event-and-user-id-and-date/find-one-by-event-and-user-id-and-date.use-case';

@Injectable()
export class CreateCheckInUseCase {
	constructor(
		@Inject(FindOneAttendeeByEventAndAttendeeIdUseCase)
		private readonly findOneAttendeeByEventAndAttendeeIdUseCase: FindOneAttendeeByEventAndAttendeeIdUseCase,
		@Inject(FindOneEventUseCase) private readonly findOneEventUseCase: FindOneEventUseCase,
		@Inject(FindOneCheckInByEventAndUserIdAndDateUseCase)
		private readonly findOneCheckInByEventAndUserIdAndDateUseCase: FindOneCheckInByEventAndUserIdAndDateUseCase,
		@Inject(SendMailUseCase) private readonly sendMailUseCase: SendMailUseCase,
		@Inject('CheckInsRepositoryInterface') private readonly checkInsRepositoryInterface: CheckInsRepositoryInterface,
	) {}
	async execute(createCheckInDto: CreateCheckInDto) {
		try {
			const checkInDate = new Date();
			const event = await this.findOneEventUseCase.execute(createCheckInDto.event_id);

			const attendee = await this.findOneAttendeeByEventAndAttendeeIdUseCase.execute(event.id, createCheckInDto.attendee_id);

			const checkIn = await this.findOneCheckInByEventAndUserIdAndDateUseCase.execute(event.id, attendee.user_id, checkInDate);

			if (checkIn.alreadyCheckedIn) {
				throw new NotAcceptableException({ message: 'Usuário já fez check in!' });
			} else {
				let count_if_date_for_verification_expires: number = 0;
				for (const check_in_date of event.check_in_dates) {
					if (
						isWithinInterval(checkInDate, {
							start: check_in_date.start_date,
							end: check_in_date.end_date,
						})
					) {
						await this.checkInsRepositoryInterface.create(createCheckInDto);
						await this.sendConfirmationEmail(attendee, event, checkInDate);
						count_if_date_for_verification_expires++;
						break;
					}
				}

				if (count_if_date_for_verification_expires === 0) {
					throw new NotAcceptableException({ message: 'Não é possível fazer check-in no evento hoje.' });
				}

				return;
			}
		} catch (error) {
			throw new HttpException(error.message, error.status);
		}
	}

	private async sendConfirmationEmail(attendee: Attendee, event: Event, checkInDate: Date) {
		if (!attendee.user.email) return;
		return await this.sendMailUseCase.execute({
			html: `
               <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <div style="padding: 20px;">
                         <h2 style="color: #333; text-align: center;">Confirmação de Check-in</h2>
                         <p style="color: #333;">Olá, ${attendee.user.name}!</p>
                         <p style="color: #333;">Recebemos sua confirmação de presença no evento ${event.title} no dia ${format(checkInDate, 'dd/MM/yyyy')}.</p>
                         <p style="color: #333;">Agradecemos por sua presença!</p>
                         <p style="color: #666; text-align: center;">Por favor, pedimos que você não responda a este e-mail, pois trata-se de uma mensagem automática.</p>
                         <div style="text-align: center; margin-top: 20px;">
                              <img src="${logoUrl}" alt="Logo da Empresa" style="max-width: 200px;">
                         </div>
                    </div>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#409d45">
                         <tbody>
                              <tr>
                                   <td align="center">
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="padding:40px 10px 40px 10px">
                                             <tbody>
                                                  <tr>
                                                       <td align="center" width="56">
                                                            <a href="https://www.instagram.com/pormadeoficial/" target="_blank" ><img src="https://ci3.googleusercontent.com/meips/ADKq_Naq0Ye_krj5vyqOk5PRhgDjudii01yDfVN8oLzTpxcTado0pUlcGgxVDc7NNiyZatlvrXYM0H8DxdxL6oB8s7JxziLa4toeaUg=s0-d-e1-ft#https://cdn.picpay.com/wv/icon/instagram-white2.png" border="0" style="display:block" alt="Instagram da Pormade" width="40" class="CToWUd" data-bit="iit"></a>
                                                       </td>
                                                       <td align="center" width="56">
                                                            <a href="https://www.linkedin.com/company/pormade-oficial/mycompany/" target="_blank""><img src="https://ci3.googleusercontent.com/meips/ADKq_NbQryZd_EC3QgrVrc4PtRo9VDIwBS_wQ-iG72bBu9D6Q3wjg28ZGzZifUiD09ejj9iiHpAtl6uj_9dSt5hYdWIVejqSDVCD=s0-d-e1-ft#https://cdn.picpay.com/wv/icon/linkedin-white.png" border="0" style="display:block" alt="Linkedin da Pormade" width="40" class="CToWUd" data-bit="iit"></a>
                                                       </td>
                                                       <td align="center" width="56">
                                                            <a href="https://www.tiktok.com/@pormadeoficial" target="_blank""><img src="https://ci3.googleusercontent.com/meips/ADKq_NauSE5riGAeZVj9i7fq2QRNWLE5rqPmocOiSpqKr9zAaPcHJOzRPRJm2Q18HxZ4SkDTJQsQKm1oQus0LQh4OpJLrX_xIg=s0-d-e1-ft#https://cdn.picpay.com/wv/icon/tiktok-white.png" border="0" style="display:block" alt="Tiktok da Pormade" width="40" class="CToWUd" data-bit="iit"></a>
                                                       </td>
                                                       <td align="center" width="56">
                                                            <a href="https://www.youtube.com/pormadeonline" target="_blank"><img src="https://ci3.googleusercontent.com/meips/ADKq_NbSpfe8S1cTu1nLNH07UTSF8oXjc6ztBnnxj-5HM3dRHTLimwA0Rj7w2be3uGYI4u3nnHEIXJns5ewG3F27f05yX5M476U=s0-d-e1-ft#https://cdn.picpay.com/wv/icon/youtube-white.png" border="0" style="display:block" alt="Youtube da Pormade" width="40" class="CToWUd" data-bit="iit"></a>
                                                       </td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                   </td>
                              </tr>
                              <tr>
                                   <td align="center">
                                        <p style="padding:20px 20px 0 20px;font-family:'Inter',sans-serif;font-size:18px;line-height:1.5;text-align:center;font-weight:400;color:#fff;margin:0">
                                             <span style="font-weight:500px"> Pormade. Descomplica, Transforma, Encanta.</span><br><br>
                                        </p>
                                   </td>
                              </tr>
                         </tbody>
                    </table>
               </div>
               `,
			to: [attendee.user.email],
			subject: `Check-in no evento: ${event.title}`,
		});
	}
}
