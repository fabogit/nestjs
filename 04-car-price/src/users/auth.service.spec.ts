import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    mockUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('Create a new user with a salted and hashed password', async () => {
    const password = 'providedpassword';
    const user = await service.signup('user@email.com', password);

    expect(user.password).not.toEqual(password);

    const [salt, hash] = user.password.split('.');

    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('Throws BadRequest if user signs up with email that is in use', async () => {
    mockUsersService.find = () =>
      Promise.resolve([
        { id: 1, email: 'asdf@asdf.com', password: '1' } as User,
      ]);

    await expect(service.signup('asdf@asdf.com', 'pass')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('Throws NotFound if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('Throws BadRequest if an invalid password is provided', async () => {
    mockUsersService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: 'whatever' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'differentpassowrd'),
    ).rejects.toThrow(BadRequestException);
  });

  it('Returns a user if correct password is provided', async () => {
    const saltAndHashedPass =
      'ce36d5015280bb13.d62aa76f54548dad5b21bbfdb66f3a86fab979a26b7ae90b1fefa15c947b9f6c';
    mockUsersService.find = () =>
      Promise.resolve([
        { email: 'asdf@asdf.com', password: saltAndHashedPass } as User,
      ]);
    const user = await service.signin('user@email.com', 'mypass');
    console.log(user);
    expect(user).toBeDefined();
  });
});

//
