import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  // POST /events → crear evento (validando payload no vacío)
  @Post()
  async createEvent(
    @Body()
    body: {
      type?: string;
      payload?: any;
      source?: string;
    },
  ) {
    if (!body.type) {
      throw new BadRequestException('El campo "type" es obligatorio');
    }

    if (!body.payload || Object.keys(body.payload).length === 0) {
      throw new BadRequestException('El campo "payload" no puede estar vacío');
    }

    return this.eventsService.create(body.type, body.payload, body.source);
  }

  // GET /events/:id → obtener evento por ID
  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const event = await this.eventsService.findById(id);

    if (!event) {
      throw new BadRequestException(`No existe un evento con id ${id}`);
    }

    return event;
  }

  // GET /events → mantener el listado existente
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
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
