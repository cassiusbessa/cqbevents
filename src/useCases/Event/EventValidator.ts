/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { Validator } from '..';
import { IEvent, IEventUpdate, IEventZodSchema, IEventZodSchemaUpdate } from '../../interfaces';

export default class EventValidator extends Validator<IEvent, IEventUpdate> {
  constructor() {
    super(IEventZodSchema, IEventZodSchemaUpdate);
  }

  public dateValidate(event: IEvent) {
    console.log('chamei validador');
    const { attractions, tickets } = event;
    console.log(tickets[0].startDate, tickets[0].endDate);
    attractions.forEach((attraction) => {
      if (attraction.startDate >= attraction.endDate) {
        throw new Error('Attraction Start date must be before end date');
      }
    });
    tickets.forEach((ticket) => {
      if (ticket.startDate >= ticket.endDate) {
        throw new Error('Sale Start date must be before end date');
      }
    });
  }

  public async startSaleDate(event: IEvent) {
    const firstSaleDate = event.tickets.reduce((acc: any, ticket: any) => {
      if (ticket.startDate < acc) {
        return ticket.startDate;
      }
      return acc;
    });
    const firstAtractionDate = event.attractions.reduce((acc: any, attraction: any) => {
      if (attraction.startDate < acc) {
        return attraction.startDate;
      }
      return acc;
    });
    if (firstSaleDate > firstAtractionDate) {
      throw new Error('Sale Start date must be before first attraction date');
    }
  }
} 