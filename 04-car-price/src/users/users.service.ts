import { Injectable } from '@nestjs/common';

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
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    // fetch user entity to enable hooks
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Object.assign(user, attrs);
    const updatedUser = {
      ...user,
      ...attrs,
    };

    this.repo.save(updatedUser);
  }

  remove(id: number) {}
}
