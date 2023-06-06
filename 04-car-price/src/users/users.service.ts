import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  // repo: Repository<User>;
  constructor(@InjectRepository(User) private repo: Repository<User>) {
    // this.repo = repo;
  }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      throw new NotFoundException('No users found');
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    // fetch user entity to enable hooks
    const user = await this.findOne(id);
    if (!user) {
      // works only for the http protocol
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    // fetch user entity to enable hooks
    const user = await this.findOne(id);
    if (!user) {
      // works only for the http protocol
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
