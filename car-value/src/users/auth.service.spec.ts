import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // create a fake copu of the users service
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

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it(' creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', ' asdf');

    expect(user.password).not.toEqual('asdf');

    const [salt, hash] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });

  it('throws an error with user signs up with email taht is in use', async () => {
    mockUsersService.find = () =>
      Promise.resolve([{ id: 1, password: '1' } as User]);
    await expect(service.signup('test@test.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    mockUsersService.find = () =>
      Promise.resolve([
        { email: 'test@test.com', password: 'laskdjf' } as User,
      ]);
    await expect(
      service.signin('laskdjf@alskdfj.com', 'password'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns an user if a correct password is provided', async () => {
    mockUsersService.find = () =>
      Promise.resolve([
        {
          email: 'someEmailstring@test.com',
          password:
            'da6399b141eac91e.da0e7804adc7d553a18c3dad5e14e92338e92138862fc1ad985d1bda7c58d08a',
        } as User,
      ]);
    const user = await service.signin('test@test.com', 'mypassword');
    expect(user).toBeDefined();
    // const user = await service.signup('test@test.com', 'mypassword');
    // console.log(user);
  });
});
