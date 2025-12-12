import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersServiceMock: any;

  beforeEach(async () => {
    // Mock de UsersService
    usersServiceMock = {
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
