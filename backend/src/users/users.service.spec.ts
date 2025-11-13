import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const dto: CreateUserDto = {
      username: 'patricia',
      email: 'patricia@example.com',
      password: '123456',
    };

    const user = service.create(dto);
    expect(user).toMatchObject(dto);
    expect(user.id).toBeDefined();
  });

  it('should find a user by ID', () => {
    const user = service.create({
      username: 'user2',
      email: 'user2@example.com',
      password: 'abcdef',
    });

    const found = service.findOne(user.id);
    expect(found).toEqual(user);
  });

  it('should throw NotFoundException if user not found', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update a user', () => {
    const user = service.create({
      username: 'oldname',
      email: 'old@example.com',
      password: '123456',
    });

    const updated = service.update(user.id, { username: 'newname' });
    expect(updated.username).toBe('newname');
    expect(service.findOne(user.id).username).toBe('newname');
  });

  it('should remove a user', () => {
    const user = service.create({
      username: 'todelete',
      email: 'delete@example.com',
      password: '123456',
    });

    service.remove(user.id);
    expect(() => service.findOne(user.id)).toThrow(NotFoundException);
  });
});
