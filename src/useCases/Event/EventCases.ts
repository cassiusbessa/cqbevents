/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEvent, ITokenPayload } from '../../interfaces';
import { EventValidator } from '..';
import { Jwt } from '../../utils';
import EventAdapter from './EventAdapter';
import { EventRepo } from '../../database';

export default class EventCases {
  constructor(    
    protected repository: EventRepo, 
    protected validator: EventValidator,
    protected jwt: Jwt,
    ) {
      this.repository = repository;
      this.validator = validator;
      this.jwt = jwt;
  }

  public async create(event: IEvent, payload: ITokenPayload): Promise<IEvent> {
    this.validator.create(event);
    const result = EventAdapter.Serialize(event);
    this.validator.dataValidate(result);
    const found = await this.repository.readOne({ title: event.title, producer: payload.username });
    this.validator.existing(found);
    const create = await this.repository.create({ ...result, producer: payload.username });
    return create;
  }

  private async ticketsDateSearch(date: string): Promise<Array<IEvent>> {
    const found = await this.repository.ticketsDateSearch(date);
    return found;
  }

  private async ticketsPriceSearch(price: number): Promise<Array<IEvent>> {
    const found = await this.repository.ticketsPriceSearch(price);
    return found;
  }

  public async getTickets(query: any): Promise<Array<IEvent>> {
    const key = Object.keys(query)[0];
    switch (key) {
      case 'date':
        return this.ticketsDateSearch(query[key]);        
      case 'price':
        return this.ticketsPriceSearch(query[key]);
      default:
        return [];
    }
  }

  private async attractionsDateSearch(date: string): Promise<Array<IEvent>> {
    const found = await this.repository.attractionsDateSearch(date);
    return found;
  }

  private async attractionsNameSearch(name: string): Promise<Array<IEvent>> {
    const found = await this.repository.attractionsNameSearch(name);
    return found;
  }

  public async getAttractions(query: any): Promise<Array<IEvent>> {
    const key = Object.keys(query)[0];
    switch (key) {
      case 'date':
        return this.attractionsDateSearch(query[key]);
      case 'title':
        return this.attractionsNameSearch(query[key]);
      default:
        return [];
    }
  }

  private async readAll(query: any): Promise<Array<IEvent>> {
    console.log(query);
    const found = await this.repository.read({ query, private: false });
    return found;
  }

  private async genreSearch(genre: string): Promise<Array<IEvent>> {
    const found = await this.repository.genreSearch(genre);
    return found;
  }

  private async producerSearch(producer: string): Promise<Array<IEvent>> {
    const found = await this.repository.producerSearch(producer);
    return found;
  }

  private async titleSearch(title: string): Promise<Array<IEvent>> {
    const found = await this.repository.titleSearch(title);
    return found;
  }

  private async localSearch(local: string): Promise<Array<IEvent>> {
    const found = await this.repository.localSearch(local);
    return found;
  }

  public async read(query: any): Promise<Array<IEvent>> {
    const key = Object.keys(query)[0];
    switch (key) {
      case 'genre':
        return this.genreSearch(query[key]);
      case 'producer':
        return this.producerSearch(query[key]);
      case 'title':
        return this.titleSearch(query[key]);
      case 'local':
        return this.localSearch(query[key]);
      default:
        return this.readAll(query);
    }
  }
}
