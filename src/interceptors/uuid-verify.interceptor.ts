import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UUIDerrorInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((error) => {
				if (error instanceof QueryFailedError && error.driverError?.code === '22P02') {
					throw new NotFoundException('Recurso não encontrado, UUID inválido.');
				}

				throw error;
			}),
		);
	}
}
