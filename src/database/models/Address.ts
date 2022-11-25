import { Schema } from 'mongoose';
import { IAddress } from '../../interfaces';

const addressSchema = new Schema<IAddress>({
  title: { type: String, required: true },
  cep: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  street: { type: String, required: true },
  number: { type: Number, required: true },
  complement: { type: String, required: false },
}, { versionKey: false });

export default addressSchema;