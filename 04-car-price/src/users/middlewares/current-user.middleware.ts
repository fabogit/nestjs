import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { SessionData } from 'express-session';

import { UsersService } from '../users.service';

// interface RequestUserId extends SessionData {
//   userId?: number;
// }

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    // const { userId }: RequestUserId = req.session || {};

    // @ts-ignore
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
    }
    next();
  }
}
