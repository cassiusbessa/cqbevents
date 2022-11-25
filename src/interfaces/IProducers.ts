import { z } from 'zod';

export const IProducerZodSchema = z.object({
  email: z.string({ required_error: 'email is required',
    invalid_type_error: 'email must be a string' })
    .email({ message: 'email must be a valid email' }),
  username: z.string({ required_error: 'username is required',
    invalid_type_error: 'username must be a string' })
    .min(3, { message: 'username must be at least 3 characters' }),
  password: z.string({ required_error: 'password is required',
    invalid_type_error: 'password must be a string' })
    .min(6, { message: 'password must be at least 6 characters' }),
});

export const IProducerZodSchemaUpdate = IProducerZodSchema.partial();

export type IProducer = z.infer<typeof IProducerZodSchema>;

export type IProducerUpdate = z.infer<typeof IProducerZodSchemaUpdate>;