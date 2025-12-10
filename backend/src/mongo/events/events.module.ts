import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/event.schema';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema }, // No usar Event.name
    ]),
  ],
  providers: [EventsService],
  exports: [EventsService],
  controllers: [EventsController], // añadimos el controller
})
export class EventsModule {}
