import { Schema } from 'mongoose';
import { IAttraction } from '../../interfaces';

const attractionSchema = new Schema<IAttraction>({
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  local: { type: String, required: false },
  image: { type: String, required: false },
  description: { type: String, required: false },
}, { versionKey: false });

export default attractionSchema;
