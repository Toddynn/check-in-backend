import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'cnpj', async: false })
@Injectable()
export class CnpjValidator implements ValidatorConstraintInterface {
	validate(cnpj: string, args: ValidationArguments) {
		if (!cnpj) {
			throw new BadRequestException({ message: 'É necessário passar um campo CNPJ.' });
		}

		cnpj = cnpj.replace(/\D/g, '');

		if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
			return false;
		}

		let tamanho = cnpj.length - 2;
		let numeros = cnpj.substring(0, tamanho);
		const digitos = cnpj.substring(tamanho);
		let soma = 0;
		let pos = tamanho - 7;

		for (let i = tamanho; i >= 1; i--) {
			soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
			if (pos < 2) pos = 9;
		}

		let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
		if (resultado !== parseInt(digitos.charAt(0))) {
			return false;
		}

		tamanho = tamanho + 1;
		numeros = cnpj.substring(0, tamanho);
		soma = 0;
		pos = tamanho - 7;

		for (let i = tamanho; i >= 1; i--) {
			soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
			if (pos < 2) pos = 9;
		}

		resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
		if (resultado !== parseInt(digitos.charAt(1))) {
			return false;
		}

		return true;
	}

	defaultMessage(args: ValidationArguments) {
		return 'CNPJ inválido';
	}
}
