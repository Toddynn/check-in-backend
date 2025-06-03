import { ConflictException, NotFoundException } from '@nestjs/common';

export enum ThrowHandlingStrategy {
	THROW_NOT_FOUND,
	IGNORE_NOT_FOUND,
	THROW_IF_FOUND,
}

export function handleError(strategy: ThrowHandlingStrategy, message: string): void {
	switch (strategy) {
		case ThrowHandlingStrategy.THROW_NOT_FOUND:
			throw new NotFoundException({ message });
		case ThrowHandlingStrategy.THROW_IF_FOUND:
			throw new ConflictException({ message });
		case ThrowHandlingStrategy.IGNORE_NOT_FOUND:
			break;
		default:
			throw new Error('Estratégia de tratamento de erro não suportada.');
	}
}
