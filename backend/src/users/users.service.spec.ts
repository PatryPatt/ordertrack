import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './repositories/user.repository';
import { EventsService } from '../mongo/events/events.service';
import { NotFoundException } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repoMock: any;
  let eventsMock: any;

  let db: any[] = [];
  let idCounter = 1;

  beforeEach(async () => {
    db = [];
    idCounter = 1;

    repoMock = {
      findOne: jest.fn((opts) => {
        return db.find((u) => u.email === opts.where.email) || null;
      }),

      findOneBy: jest.fn(({ id }) => {
        return db.find((u) => u.id === id) || null;
      }),

      find: jest.fn(() => db),

      create: jest.fn((dto) => ({ id: idCounter++, ...dto })),

      save: jest.fn((entity) => {
        const idx = db.findIndex((u) => u.id === entity.id);

        if (idx >= 0) {
          db[idx] = entity;
        } else {
          db.push(entity);
        }

        return entity;
      }),

      remove: jest.fn((entity) => {
        db = db.filter((u) => u.id !== entity.id);
      }),
    };

    eventsMock = {
      create: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: repoMock },
        { provide: EventsService, useValue: eventsMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'patricia',
      email: 'patricia@example.com',
    };

    const user = await service.create(dto);
    expect(user).toHaveProperty('id');
    expect(user.name).toBe(dto.name);
    expect(eventsMock.create).toHaveBeenCalled();
  });

  it('should find a user by ID', async () => {
    const dto: CreateUserDto = {
      name: 'user2',
      email: 'user2@example.com',
    };

    const created = await service.create(dto);
    const found = await service.findOne(created.id);

    expect(found.id).toBe(created.id);
  });

  it('should throw NotFoundException if user not found', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const dto: CreateUserDto = {
      name: 'oldname',
      email: 'old@example.com',
    };

    const created = await service.create(dto);

    const updateDto: UpdateUserDto = { name: 'newname' };
    await service.update(created.id, updateDto);

    const fetched = await service.findOne(created.id);
    expect(fetched.name).toBe('newname');
  });

  it('should remove a user', async () => {
    const dto: CreateUserDto = {
      name: 'todelete',
      email: 'delete@example.com',
    };

    const created = await service.create(dto);

    await service.remove(created.id);

    await expect(service.findOne(created.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
