import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async create(type: string, payload: Record<string, any>, source?: string) {
    return this.eventModel.create({ type, payload, source });
  }

  async findAll(limit = 50) {
    return this.eventModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()
      .exec();
  }
  // TEST MANUAL
  async createTestEvent() {
    return this.eventModel.create({
      type: 'test_event',
      payload: { msg: 'hola' },
      source: 'manual-test',
    });
  }
}
