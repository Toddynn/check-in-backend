import { BadRequestException, Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { CnpjValidator } from './validate-cnpj.decorator';
import { CpfValidator } from './validate-cpf.decorator';

@ValidatorConstraint({ name: 'document', async: false })
@Injectable()
export class DocumentValidator implements ValidatorConstraintInterface {
	validate(document: string, args: ValidationArguments) {
		if (!document) {
			throw new BadRequestException({ message: 'É necessário passar um campo document.' });
		}

		document = document.replace(/[^\d]+/g, '');

		const cpfValidator = new CpfValidator();
		const cnpjValidator = new CnpjValidator();

		if (document.length === 11) {
			return cpfValidator.validate(document, args);
		} else if (document.length === 14) {
			return cnpjValidator.validate(document, args);
		} else {
			return false;
		}
	}

	defaultMessage(args: ValidationArguments) {
		return 'Documento inválido';
	}
}

export function IsDocument(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: DocumentValidator,
		});
	};
}
