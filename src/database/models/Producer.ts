import { Schema, model } from 'mongoose';
import { IProducer } from '../../interfaces';

const producerSchema = new Schema<IProducer>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});

const Producer = model<IProducer>('Producer', producerSchema);

export default Producer;
