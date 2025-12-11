import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from './events.service';

describe('EventsService - findDynamic', () => {
  let service: EventsService;
  let eventModelMock: any;

  beforeEach(async () => {
    eventModelMock = {
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken('Event'),
          useValue: eventModelMock,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('Debe aplicar correctamente limit y skip', async () => {
    const query = { limit: '20', skip: '10' };

    await service.findDynamic(query);

    expect(eventModelMock.skip).toHaveBeenCalledWith(10);
    expect(eventModelMock.limit).toHaveBeenCalledWith(20);
  });

  it('Debe aplicar valores por defecto cuando no se manda limit/skip', async () => {
    await service.findDynamic({});

    expect(eventModelMock.skip).toHaveBeenCalledWith(0);
    expect(eventModelMock.limit).toHaveBeenCalledWith(50);
  });

  it('Debe construir correctamente el filtro con type y userId', async () => {
    const query = { type: 'USER_CREATED', userId: '99' };

    await service.findDynamic(query);

    expect(eventModelMock.find).toHaveBeenCalledWith({
      type: 'USER_CREATED',
      'payload.userId': '99',
    });
  });

  it('Debe mapear otros parámetros dinámicos al payload', async () => {
    const query = { foo: 'bar', x: '10' };

    await service.findDynamic(query);

    expect(eventModelMock.find).toHaveBeenCalledWith({
      'payload.foo': 'bar',
      'payload.x': '10',
    });
  });
});
