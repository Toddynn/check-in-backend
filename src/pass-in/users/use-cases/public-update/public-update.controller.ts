import { Body, Controller, Inject, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/models/decorators/is-public.decorator';
import { UpdateUserDto } from 'src/pass-in/users/models/dto/update-user.dto';
import { PublicUpdateUserDocs } from './docs';
import { PublicUpdateUserUseCase } from './public-update.use-case';

@ApiTags('Users')
@IsPublic()
@Controller('users')
export class PublicUpdateUserController {
	constructor(
		@Inject(PublicUpdateUserUseCase)
		private readonly publicUpdateUserUseCase: PublicUpdateUserUseCase,
	) {}

	@Patch('/public')
	@PublicUpdateUserDocs()
	async execute(@Body() updateUserDto: UpdateUserDto) {
		return await this.publicUpdateUserUseCase.execute(updateUserDto);
	}
}
