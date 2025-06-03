import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
	@ApiProperty({
		example: '2411354351-asdas2d4aw5das-asdadad',
		description: 'id do usuário',
	})
	@IsNotEmpty()
	@IsString({ message: 'Id deve ser uma string' })
	id: string;
}
