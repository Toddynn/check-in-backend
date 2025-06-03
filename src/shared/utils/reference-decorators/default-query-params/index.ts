import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function DefaultQueryParamsDocs() {
	return applyDecorators(
		ApiQuery({ name: 'page', required: false, type: Number, description: 'Número da página (padrão: 1)' }),
		ApiQuery({ name: 'limit', required: false, type: Number, description: 'Itens por página (padrão: 10)' }),
		ApiQuery({ name: 'search', required: false, type: String, description: 'Pesquisa' }),
	);
}
