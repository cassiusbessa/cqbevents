/* eslint-disable class-methods-use-this */
import { IEvent } from '../../interfaces';

export default class EventAdapter {
  public static Serialize(event: IEvent): IEvent {
    const attractions = event.attractions.map((attraction) => ({
      ...attraction,
      startDate: new Date(attraction.startDate),
      endDate: new Date(attraction.endDate),
  }));
  const tickets = event.tickets.map((ticket) => ({
    ...ticket,
    startDate: new Date(ticket.startDate),
    endDate: new Date(ticket.endDate),
    }));

    return {
      ...event,
      attractions,
      tickets,
    };
  }
}