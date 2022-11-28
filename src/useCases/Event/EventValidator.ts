/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { Validator } from '..';
import { IEvent, IEventUpdate, IEventZodSchema, IEventZodSchemaUpdate, 
  ITicket } from '../../interfaces';

export default class EventValidator extends Validator<IEvent, IEventUpdate> {
  constructor() {
    super(IEventZodSchema, IEventZodSchemaUpdate);
  }

  private stardAndEndDate(event: IEvent) {
    const { attractions, tickets } = event;
    attractions.forEach((attraction) => {
      if (attraction.startDate >= attraction.endDate) {
        throw new Error('Attraction Start date must be before end date');
      }
    });
    tickets.forEach((ticket: ITicket) => {
      if (ticket.startDate >= ticket.endDate) {
        throw new Error('Sale Start date must be before end date');
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
      return acc;
    });
  }

  private saleAndAttractionDate(event: IEvent) {
    const firstSaleDate = this.firstSaleDate(event) as any;
    console.log(firstSaleDate);
    const firstAtractionDate = this.firstAtractionDate(event) as any;
    if (firstSaleDate > firstAtractionDate) {
      throw new Error('Sale Start date must be before first attraction date');
    }

    if (firstSaleDate.startDate < Date.now()) {
      throw new Error('Sale Start date must be after now');
    }

    if (firstAtractionDate.startDate < Date.now()) {
      throw new Error('Attraction Start date must be after now');
    }
  }

  public dataValidate(event: IEvent) {
    this.stardAndEndDate(event);
    this.saleAndAttractionDate(event);
  }
} 