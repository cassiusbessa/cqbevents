import { SomeZodObject } from 'zod';
import { IBuyTicket, IBuyTicketZodSchema } from '../../interfaces/ITicket';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { Validator } from '..';
import { IEvent, IEventUpdate, IEventZodSchema, IEventZodSchemaUpdate, 
  ITicket } from '../../interfaces';
import { CustomError, httpStatusCode } from '../../utils';

export default class EventValidator extends Validator<IEvent, IEventUpdate> {
  constructor(private buySchema: SomeZodObject) {
    super(IEventZodSchema, IEventZodSchemaUpdate);
    this.buySchema = buySchema;
  }

  private stardAndEndDate(event: IEvent) {
    const { attractions, tickets } = event;
    attractions.forEach((attraction) => {
      if (attraction.startDate >= attraction.endDate) {
        throw new CustomError(
          'Attraction Start date must be before end date', 
          httpStatusCode.BAD_REQUEST,
        );
      }
    });
    tickets.forEach((ticket: ITicket) => {
      if (ticket.startDate >= ticket.endDate) {
        throw new CustomError(
          'Sale Start date must be before end date', 
          httpStatusCode.BAD_REQUEST,
        );
      }
    });
  }

  private firstSaleDate(event: IEvent) {
    return event.tickets.reduce((acc: any, ticket: any) => {
      if (ticket.startDate < acc) {
        return ticket.startDate;
      }
      return acc;
    });
  }

  private firstAtractionDate(event: IEvent) {
    return event.attractions.reduce((acc: any, attraction: any) => {
      if (attraction.startDate < acc) {
        return attraction.startDate;
      }
      return acc.startDate;
    });
  }

  private saleAndAttractionDate(event: IEvent) {
    const firstSaleDate = this.firstSaleDate(event) as any;
    // console.log('>>>>>>>', firstSaleDate.startDate.getTimezoneOffset(), new Date(Date.now()).getTimezoneOffset());
    const firstAtractionDate = this.firstAtractionDate(event) as any;
    if (firstSaleDate > firstAtractionDate) {
      throw new CustomError(
        'Sale Start date must be before first attraction date', 
        httpStatusCode.BAD_REQUEST,
      );
    }

    if (firstSaleDate.startDate.getTimezoneOffset() < new Date(Date.now()).getTimezoneOffset()) {
      throw new CustomError('Sale Start date must be after now', httpStatusCode.BAD_REQUEST);
    }

    if (firstAtractionDate.startDate.getTimezoneOffset() 
      < new Date(Date.now()).getTimezoneOffset()) {
      throw new CustomError('Attraction Start date must be after now', httpStatusCode.BAD_REQUEST);
    }
  }

  public dataValidate(event: IEvent) {
    this.stardAndEndDate(event);
    this.saleAndAttractionDate(event);
  }

  public saleValidate(sale: IBuyTicket) {
    const valid = this.buySchema.safeParse(sale);
    if (!valid.success) {
      const message = valid.error.issues.map((issue) => issue.message).join(' | ');
      throw new CustomError(message, httpStatusCode.BAD_REQUEST);
    }
  }

  public saleQuantityValidate(sale: IBuyTicket, event: IEvent) {
    const { ticketTitle, quantity } = sale;
    const ticket = event.tickets.find((t) => t.title === ticketTitle) as ITicket;
    if (ticket.solds + quantity > ticket.quantity) {
      throw new CustomError('Not enough tickets', httpStatusCode.BAD_REQUEST);
    }
  }

  public saleDateValidate(sale: IBuyTicket, event: IEvent) {
    const { ticketTitle } = sale;
    const ticket = event.tickets.find((t) => t.title === ticketTitle) as ITicket;
    if (ticket.startDate.getTimezoneOffset() as any > new Date(Date.now()).getTimezoneOffset()) {
      throw new CustomError('Sale not started', httpStatusCode.BAD_REQUEST);
    }
    if (ticket.endDate.getTimezoneOffset() as any < new Date(Date.now()).getTimezoneOffset()) {
      throw new CustomError('Sale ended', httpStatusCode.BAD_REQUEST);
    }
  }
} 