import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
@Injectable()
export class CpfValidator implements ValidatorConstraintInterface {
	validate(cpf: string, args: ValidationArguments) {
		if (!cpf) {
			throw new BadRequestException({ message: 'É necessário passar um campo cpf.' });
		}

		cpf = cpf.replace(/\D/g, '');

		if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
			return false;
		}

		let add = 0;
		for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
		let rev = 11 - (add % 11);
		if (rev === 10 || rev === 11) rev = 0;
		if (rev !== parseInt(cpf.charAt(9))) return false;

		add = 0;
		for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
		rev = 11 - (add % 11);
		if (rev === 10 || rev === 11) rev = 0;
		if (rev !== parseInt(cpf.charAt(10))) return false;

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return 'CPF inválido';
	}
}
