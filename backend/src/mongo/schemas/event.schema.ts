import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema({
  timestamps: true,
  strict: false, // << permite campos adicionales
})
export class Event {
  @Prop({ required: true })
  type!: string;

  @Prop({ type: Object })
  payload!: Record<string, any>;

  @Prop()
  source?: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);

// índices recomendados
EventSchema.index({ type: 1, createdAt: -1 });
