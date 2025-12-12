import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EventsQueryDto } from './dtos/events-query.dto';
import { CreateEventDto } from './dtos/create-event.dto';

@ApiTags('events') //Agrupa todos los endpoints del controlador bajo el tag Events en Swagger UI.
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * POST /events → Crear evento validando campos obligatorios
   */
  @ApiOperation({ summary: 'Registrar nuevo evento' })
  @Post()
  async createEvent(
    @Body()
    body: CreateEventDto,
  ) {
    return this.eventsService.create(body.type, body.payload, body.source);
  }

  /**
   * GET /events/:id → Obtener evento por ID
   */
  @ApiOperation({ summary: 'Consulta dinámica de eventos' })
  @Get(':id')
  async getEventById(@Param('id') id: string) {
    const event = await this.eventsService.findById(id);

    if (!event) {
      throw new BadRequestException(`No existe un evento con id ${id}`);
    }

    return event;
  }

  /**
   * GET /events → Búsqueda dinámica con filtros opcionales
   * Documentado para Swagger con @ApiQuery
   * name: nombre del query param.
   * required: false: opcional.
   * description: descripción visible en Swagger.
   */
  @Get()
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Tipo de evento a filtrar',
  })
  @ApiQuery({
    name: 'userId',
    required: false,
    description: 'User ID dentro del payload',
  })
  @ApiQuery({
    name: 'source',
    required: false,
    description: 'Origen del evento',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de registros (ej: 20)',
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Offset de paginación (ej: 40)',
  })
  // Agrega aquí más filtros opcionales si quieres que Swagger los documente
  async findDynamic(@Query() query: EventsQueryDto) {
    return this.eventsService.findDynamic(query);
  }

  /**
   * Utilidades de test manual
   */
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
