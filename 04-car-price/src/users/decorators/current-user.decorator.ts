import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../user.entity';

interface SessionRequest extends Request {
  currentUser: User;
}

export const CurrentUser = createParamDecorator(
  // data is the argument passed to @CurrentUser("data")
  // since this decorator will not use args => data: never
  (data: never, context: ExecutionContext) => {
    const request: SessionRequest = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
