import Repository from './Repository';
import { IBuyTicket, IEvent } from '../interfaces';
import { Event } from '../database/models';

export default class EventRepo extends Repository<IEvent, IEvent> {
  constructor() {
    super(Event);
  }

  public async ticketsDateSearch(date: string): Promise<Array<IEvent>> {
    const found = await this.model.find({
      tickets: {
        $elemMatch: {
          startDate: { $lte: new Date(date) },
          endDate: { $gte: new Date(date) },
        },
      },
      attractions: {
        $elemMatch: {
          endDate: { $gte: Date.now() },
        },
      },
      private: false,
    });
    return found;
  }

  public async ticketsPriceSearch(price: number): Promise<Array<IEvent>> {
    const found = await this.model.find({
      tickets: {
        $elemMatch: {
          price: { $lte: price },
        },
      },
      attractions: {
        $elemMatch: {
          endDate: { $gte: Date.now() },
        },
      },
      private: false,
    });
    return found;
  }

  public async soldTickets(buy: IBuyTicket): Promise<any> {
    const found = await this.model.findOneAndUpdate(
      {
        title: buy.eventTitle,
        'tickets.title': buy.ticketTitle,
      },
      {
        $inc: { 'tickets.$.solds': buy.quantity },
      },
      { new: true },
    );
    return found;
  }

  public async attractionsDateSearch(date: string): Promise<Array<IEvent>> {
    const search = `${date}T23:59:59.000Z`;

    const found = await this.model.find({
      attractions: {
        $elemMatch: {
          startDate: { $lte: new Date(search) },
          endDate: { $gte: new Date(date) },
        },
      },
      private: false,
    });
    return found;
  }

  public async attractionsNameSearch(title: string): Promise<Array<IEvent>> {
    const myRegex = new RegExp(title, 'i');
    const found = await this.model.find({ 
        $and: [
          { attractions: { $elemMatch: { name: myRegex } } },
          { attractions: { $elemMatch: { endDate: { $gte: Date.now() } } } },
        ],       
        private: false, 
      });
    return found;
  }

  public async genreSearch(genre: string): Promise<Array<IEvent>> {
    const myRegex = new RegExp(genre, 'i');
    const found = await this.model.find({ 
      genre: { $in: myRegex }, 
      attractions: { $elemMatch: { endDate: { $gte: Date.now() } } },
      private: false, 
    });
    return found;
  }

  public async producerSearch(producer: string): Promise<Array<IEvent>> {
    const myRegex = new RegExp(producer, 'i');
    const found = await this.model.find({ 
      producer: myRegex,
      attractions: {
        $elemMatch: {
          endDate: { $gte: Date.now() },
        },
      }, 
      private: false,
    });
    return found;
  }

  public async titleSearch(title: string): Promise<Array<IEvent>> {
    const myRegex = new RegExp(`.*${title}.*`, 'i');
    const found = await this.model.find({ 
      title: myRegex, 
      attractions: {
        $elemMatch: {
          endDate: { $gte: Date.now() },
        },
      },
      private: false, 
    });
    return found;
  }

  public async localSearch(local: string): Promise<Array<IEvent>> {
    const myRegex = new RegExp(local, 'i');
    const found = await this.model.find({ 
      $or: [
        { 'address.city': myRegex }, 
        { 'address.state': myRegex }, 
        { 'address.title': myRegex }], 
      attractions: {
        $elemMatch: {
          endDate: { $gte: Date.now() },
        },
      },
      private: false, 
    });
    return found;
  }
}