import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { FindRelationsNotFoundError } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUserService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      // signup: (email, password) => {},
      // signin: (email, password) => {},
    };
    mockUserService = {
      find: (email) => {
        return Promise.resolve([
          {
            id: 1,
            email,
            password: 'pass',
          } as User,
        ]);
      },
      findOne: (id) => {
        return Promise.resolve({
          id,
          email: 'mail@email.com',
          password: 'pass',
        } as User);
      },
      // remove: (id) => {},
      // update: (id, attrs) => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
