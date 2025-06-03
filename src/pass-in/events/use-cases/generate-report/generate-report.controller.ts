import { BadRequestException, Controller, Get, Inject, Param, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { GenerateEventReportDocs } from './docs';
import { GenerateEventReportUseCase } from './generate-report.use-case';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('events')
@UseGuards(JwtAuthGuard)
export class GenerateEventReportController {
	constructor(
		@Inject(GenerateEventReportUseCase)
		private readonly generateEventReportUseCase: GenerateEventReportUseCase,
	) {}

	@Get(':id/relatory')
	@GenerateEventReportDocs()
	async execute(@Param('id') id: string, @Res() res: Response) {
		try {
			const event_relatory = await this.generateEventReportUseCase.execute(id);

			res.header('Content-Type', 'application/pdf');
			res.header('Content-Disposition', `attachment; filename=${event_relatory.filename}`);

			res.send(event_relatory.data);
		} catch (error) {
			throw new BadRequestException({
				message: 'Não foi possível gerar este relatório.' + error,
			});
		}
	}
}
