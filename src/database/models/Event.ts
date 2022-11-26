import { Schema, model } from 'mongoose';
import { IEvent } from '../../interfaces';
import { attractionSchema, addressSchema, ticketSchema } from '.';

const eventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  producer: { type: String, required: true },
  genre: { type: [String], required: true },
  attractions: { type: [attractionSchema], required: true },
  tickets: { type: [ticketSchema], required: false },
  address: { type: addressSchema, required: true },
  image: { type: String, required: false },
  private: { type: Boolean, required: true, default: true },
  description: { type: String, required: false },
}, { versionKey: false, timestamps: false });

const Event = model<IEvent>('Event', eventSchema);

export default Event;