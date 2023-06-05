import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }
    // Gen a 16chars salt
    const salt = randomBytes(8).toString('hex');
    //  Hash salt&pass
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join hashed result and salt togheter
    const newUserPwd = `${salt}.${hash.toString('hex')}`;
    // Create user & save
    const newUser = await this.userService.create(email, newUserPwd);
    return newUser;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // check if password === stored password
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const isWrongPassword = storedHash !== hash.toString('hex');
    if (isWrongPassword) {
      throw new BadRequestException('Wrong email/password');
    }
    return user;
  }
}
