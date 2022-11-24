import { z } from 'zod';
import { IAttractionsZodSchema } from './IAttractions';
import { IAddressZodSchema } from './IAddress';
import { ITicketsZodSchema } from './ITickets';

export const IEventsZodSchema = z.object({
  title: z.string({ required_error: 'title is required',
    invalid_type_error: 'title must be a string' })
    .min(3, { message: 'title must be at least 3 characters' }),
  producer: z.string({ required_error: 'producer is required',
    invalid_type_error: 'producer must be a string' }),
  attractions: z.array(IAttractionsZodSchema),
  tickets: z.array(ITicketsZodSchema),
  address: IAddressZodSchema,
  image: z.string().optional(),
  private: z.boolean({ required_error: 'private is required',
    invalid_type_error: 'private must a boolean' }),
  description: z.string().optional(),
});

export type IEvents = z.infer<typeof IEventsZodSchema>;
