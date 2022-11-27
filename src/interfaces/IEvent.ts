import { z } from 'zod';
import { IAttractionZodSchema } from './IAttraction';
import { IAddressZodSchema } from './IAddress';
import { ITicketZodSchema } from './ITicket';

export const IEventZodSchema = z.object({
  title: z.string({ required_error: 'title is required',
    invalid_type_error: 'title must be a string' })
    .min(3, { message: 'title must be at least 3 characters' }),
  producer: z.string({ required_error: 'producer is required',
    invalid_type_error: 'producer must be a string' }),
  genre: z.array(z.string({ required_error: 'genre is required',
    invalid_type_error: 'genre must be a string' }), { required_error: 'genre is required' })
    .min(1, { message: 'genre must be at least 1 character' }),
  attractions: z.array(IAttractionZodSchema, { required_error: 'attractions is required' })
    .min(1, { message: 'attractions must have at least 1 item' }),
  tickets: z.array(ITicketZodSchema, { required_error: 'tickets is required' }),
  address: z.object(IAddressZodSchema.shape, { required_error: 'address is required' }),
  image: z.string().optional(), 
  private: z.boolean({ required_error: 'private is required',
    invalid_type_error: 'private must a boolean' })
    .optional(),
  description: z.string()
    .max(100, { message: 'description must be at most 150 characters' })
    .optional(),
});

export const IEventZodSchemaUpdate = IEventZodSchema.deepPartial();

export type IEvent = z.infer<typeof IEventZodSchema>;

export type IEventUpdate = z.infer<typeof IEventZodSchemaUpdate>;
