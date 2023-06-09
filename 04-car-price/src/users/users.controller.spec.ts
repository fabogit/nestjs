import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      // signup: (email, password) => {},
      // signin: (email, password) => {},
    };
    mockUsersService = {
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
          useValue: mockUsersService,
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

  it('findAllUser return a list of users with the given email', async () => {
    const email = 'mail@email.com';
    const users = await controller.findAllUsers(email);

    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(email);
  });

  it('findUser return a single user with the given id', async () => {
    const id = 1;
    const users = await controller.findUser(id);
    expect(users).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    // override method
    mockUsersService.findOne = () => null;
    await expect(controller.findUser(1)).rejects.toThrow(NotFoundException);
  });
});
