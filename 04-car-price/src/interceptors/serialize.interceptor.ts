import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Code to run before a request is handled by the request handler
    // console.log('Running before the handler', context);

    return next.handle().pipe(
      map((data: any) => {
        // Code to run before the response is sent out
        // console.log('Running before response is sent out', data);
        return plainToInstance(this.dto, data, {
          // Keep from entity only @Expose
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}