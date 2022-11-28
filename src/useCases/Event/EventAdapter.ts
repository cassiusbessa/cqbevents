/* eslint-disable class-methods-use-this */
import { IBuyTicket, IEvent, ISale, ITicket } from '../../interfaces';

export default class EventAdapter {
  public static serializeCreate(event: IEvent): IEvent {
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

  public static serializeSeller(event: IEvent, buy: IBuyTicket): ISale {
    const ticket = event.tickets.find((t) => t.title === buy.ticketTitle) as ITicket;
    const totalPrice = ticket.price * buy.quantity;
    return {
      event: event.title,
      ticket: ticket.title,
      quantity: buy.quantity,
      total: totalPrice,
      billing: '',
    };
  }
}