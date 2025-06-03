import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Media } from 'src/pass-in/medias/models/entities/media.entity';
import { APP_URL } from 'src/shared/utils/constants/file';

@Injectable()
export class MediaUrlInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data) => {
				if (data && data.result_rows) {
					data.result_rows = data.result_rows.map((media: Media) => ({
						...media,
						path: `${APP_URL}/${media.path}`,
					}));
				}
				return data;
			}),
		);
	}
}
