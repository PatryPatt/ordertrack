import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { Event } from '../schemas/event.schema';

describe('EventsService ', () => {
  let service: EventsService;
  let modelMock: any;
  beforeEach(async () => {
    // Mock completo del modelo de Mongoose
    modelMock = {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([]),
      findById: jest.fn().mockReturnThis(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken(Event.name),
          useValue: modelMock,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('Debe aplicar correctamente limit y skip', async () => {
    const query = { limit: '20', skip: '10' };

    await service.findDynamic(query);

    expect(modelMock.skip).toHaveBeenCalledWith(10);
    expect(modelMock.limit).toHaveBeenCalledWith(20);
  });

  it('Debe aplicar valores por defecto cuando no se manda limit/skip', async () => {
    await service.findDynamic({});

    expect(modelMock.skip).toHaveBeenCalledWith(0);
    expect(modelMock.limit).toHaveBeenCalledWith(50);
  });

  it('Debe construir correctamente el filtro con type y userId', async () => {
    const query = { type: 'USER_CREATED', userId: '99' };

    await service.findDynamic(query);

    expect(modelMock.find).toHaveBeenCalledWith({
      type: 'USER_CREATED',
      'payload.userId': '99',
    });
  });

  it('Debe mapear otros parámetros dinámicos al payload', async () => {
    const query = { foo: 'bar', x: '10' };

    await service.findDynamic(query);

    expect(modelMock.find).toHaveBeenCalledWith({
      'payload.foo': 'bar',
      'payload.x': '10',
    });
  });

  it('Debe crear un evento', async () => {
    modelMock.create.mockResolvedValue({ _id: '123', type: 'TEST' });

    const event = await service.create('TEST', { data: 1 });

    expect(modelMock.create).toHaveBeenCalledWith({
      type: 'TEST',
      payload: { data: 1 },
      source: undefined,
    });

    expect(event).toHaveProperty('_id');
    expect(event.type).toBe('TEST');
  });
});
