import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

// Generics type placeholder for dto
export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    // Code to run before a request is handled by the request handler
    // console.log('Running before the handler', context);

    return next.handle().pipe(
      map((data: T) => {
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
