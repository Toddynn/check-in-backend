import { BadRequestException, Body, Controller, Inject, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/models/guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/pass-in/users/models/dto/update-user.dto';
import { UpdateUserDocs } from './docs';
import { UpdateUserUseCase } from './update.use-case';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UpdateUserController {
	constructor(
		@Inject(UpdateUserUseCase)
		private readonly updateUserUseCase: UpdateUserUseCase,
	) {}

	@Patch()
	@UpdateUserDocs()
	async execute(@Body() updateUserDto: UpdateUserDto) {
		if ('document' in updateUserDto) {
			throw new BadRequestException('O campo "documento" não é permitido na atualização do usuário.');
		}

		return await this.updateUserUseCase.execute(updateUserDto);
	}
}
