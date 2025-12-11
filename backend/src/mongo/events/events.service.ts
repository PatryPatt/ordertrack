import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  /**
   * Crear un evento genérico
   */
  async create(type: string, payload: Record<string, any>, source?: string) {
    return this.eventModel.create({ type, payload, source });
  }

  /**
   * Listado general (limitado)
   */
  async findAll(limit = 50) {
    return this.eventModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  /**
   * Buscar por ID
   */
  async findById(id: string) {
    return this.eventModel.findById(id).lean().exec();
  }

  /**
   * Crear un evento de prueba manual
   */
  async createTestEvent() {
    return this.eventModel.create({
      type: 'test_event',
      payload: { msg: 'hola' },
      source: 'manual-test',
    });
  }

  /**
   * Búsqueda dinámica:
   * - type → filtro directo
   * - userId → se busca dentro del payload: payload.userId
   * - cualquier otra key → se asume dentro de payload
   */
  async findDynamic(query: any) {
    const filters: any = {};

    // Filtro directo por tipo de evento
    if (query.type) {
      filters.type = query.type;
    }

    // Filtro directo sobre payload.userId (caso común del dominio)
    if (query.userId) {
      filters['payload.userId'] = query.userId;
    }

    // Filtrar dinámicamente el resto del payload
    Object.keys(query).forEach((key) => {
      if (!['type', 'userId', 'limit', 'skip'].includes(key)) {
        filters[`payload.${key}`] = query[key];
      }
    });

    const limit = query.limit ? parseInt(query.limit, 10) : 50;
    const skip = query.skip ? parseInt(query.skip, 10) : 0;

    return this.eventModel
      .find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}
