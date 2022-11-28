import { z } from 'zod';

export const ITicketZodSchema = z.object({
  title: z.string({ required_error: 'title is required',
    invalid_type_error: 'title must be a string' })
    .min(3, { message: 'title must be at least 3 characters' }),
  startDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: 'startDate is required', 
    invalid_type_error: 'startDate must be a date' })),
  endDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: 'endDate is required', 
    invalid_type_error: 'endDate must be a date' })),
  quantity: z.number({ required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a number' }),
  solds: z.number({ required_error: 'solds is required',
    invalid_type_error: 'solds must be a number' }),
  price: z.number({ required_error: 'price is required',
    invalid_type_error: 'price must be a number' }),
  description: z.string().optional(),
});

export const IBuyTicketZodSchema = z.object({
  eventTitle: z.string({ required_error: 'eventTitle is required',
    invalid_type_error: 'eventTitle must be a string' }),
  ticketTitle: z.string({ required_error: 'ticketTitle is required',
    invalid_type_error: 'ticketTitle must be a string' }),
  quantity: z.number({ required_error: 'quantity is required',
    invalid_type_error: 'quantity must be a number' }),
});

export interface ISale {
  event: string;
  total: number;
  ticket: string;
  quantity: number;
  billing: string;
}

export type ITicket = z.infer<typeof ITicketZodSchema>;

export type IBuyTicket = z.infer<typeof IBuyTicketZodSchema>;