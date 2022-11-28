import { Schema } from 'mongoose';
import { ITicket } from '../../interfaces';

const ticketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  solds: { type: Number, required: false },
  description: { type: String, required: false },
}, { versionKey: false, _id: false });

export default ticketSchema;