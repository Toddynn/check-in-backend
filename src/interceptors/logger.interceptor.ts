import { CallHandler, ExecutionContext, HttpException, HttpStatus, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from 'winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
	constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			catchError((error) => {
				const request = context.switchToHttp().getRequest();
				const { method, url } = request;

				const status = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

				// Só loga como erro se for 500+
				if (status >= 500) {
					this.logger.error(`Error in ${method} ${url}`, {
						error: error.message,
						stack: error.stack,
					});
				}

				if (error instanceof HttpException) {
					throw error;
				}

				throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
			}),
		);
	}
}
