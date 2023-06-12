import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionData } from 'express-session';

import { UsersService } from '../users.service';
import { User } from '../user.entity';

interface RequestUserId extends SessionData {
  userId?: number;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    const { userId }: Partial<RequestUserId> = req.session || {};

    // const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      req.currentUser = user;
    }
    next();
  }
}
