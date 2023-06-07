import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';
import { User } from '../user.entity';

export interface SessionRequest extends Request {
  session?: {
    userId: number;
  };
  currentUser?: User;
}

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request: SessionRequest = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // console.log(user);

      request.currentUser = user;
    }

    return next.handle();
  }
}
