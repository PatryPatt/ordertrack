import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: any;

  beforeEach(async () => {
    service = {
      findDynamic: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('GET /events should call findDynamic with query params', async () => {
    const query = { type: 'USER_CREATED', userId: '1' };

    await controller.findDynamic(query);

    expect(service.findDynamic).toHaveBeenCalledWith(query);
  });

  it('GET /events/:id should return event if exists', async () => {
    const fakeEvent = { id: 'abc123' };
    service.findById.mockResolvedValue(fakeEvent);

    const result = await controller.getEventById('abc123');

    expect(result).toEqual(fakeEvent);
  });

  it('POST /events should create an event', async () => {
    const payload = {
      type: 'TEST',
      payload: { hello: 'world' },
      source: 'api',
    };

    await controller.createEvent(payload);

    expect(service.create).toHaveBeenCalledWith(
      payload.type,
      payload.payload,
      payload.source,
    );
  });
});
