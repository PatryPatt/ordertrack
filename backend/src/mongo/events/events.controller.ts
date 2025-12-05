import { Controller, Post } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('test')
  createTest() {
    return this.eventsService.create(
      'test_event',
      { hello: 'world' },
      'api-test',
    );
  }

  @Post('manual-test')
  createManualTest() {
    return this.eventsService.createTestEvent();
  }
}
