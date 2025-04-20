import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PaginatedResponseDto } from '@shared/dtos';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginatedResponseInterceptor<T>
  implements NestInterceptor<T, PaginatedResponseDto<T>>
{
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<PaginatedResponseDto<T>> {
    return next.handle().pipe(
      map((response) => {
        const { skip, total, data, take, hasNext } = response || {};
        return {
          skip,
          total,
          data,
          take,
          hasNext: hasNext ?? total - skip - take > 0,
        };
      }),
    );
  }
}
