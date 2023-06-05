import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Code to run before a request is handled by the request handler
    console.log('Running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // Code to run before the response is sent out
        console.log('Running before response is sent out', data);
      }),
    );
  }
}
