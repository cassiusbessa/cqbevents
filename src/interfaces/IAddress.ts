import { z } from 'zod';

export const IAddressZodSchema = z.object({
  title: z.string({ required_error: 'title is required',
    invalid_type_error: 'title must be a string' })
    .min(3, { message: 'title must be at least 3 characters' }),
  cep: z.string({ required_error: 'cep is required',
    invalid_type_error: 'cep must be a string' })
    .length(8, { message: 'cep must be 8 characters' }),
  state: z.string({ required_error: 'state is required',
    invalid_type_error: 'state must be a string' })
    .length(2, { message: 'state must be 2 characters' }),
  city: z.string({ required_error: 'city is required',
    invalid_type_error: 'city must be a string' })
    .min(3, { message: 'city must be at least 3 characters' }),
  street: z.string({ required_error: 'street is required',
    invalid_type_error: 'street must be a string' })
    .min(3, { message: 'street must be at least 3 characters' }),
  number: z.string({ required_error: 'number is required',
    invalid_type_error: 'number must be a string' })
    .min(1, { message: 'number must be at least 1 characters' }),
  complement: z.string().optional(),
});

export type IAddress = z.infer<typeof IAddressZodSchema>;
