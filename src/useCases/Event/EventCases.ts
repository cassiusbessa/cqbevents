/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEvent, IEventUpdate, IRepository, ITokenPayload } from '../../interfaces';
import { EventValidator } from '..';
import { Jwt } from '../../utils';
import EventAdapter from './EventAdapter';

export default class EventCases {
  constructor(    
    protected repository: IRepository<IEvent, IEventUpdate>, 
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
    this.validator.dateValidate(result);
    this.validator.startSaleDate(result);
    const found = await this.repository.readOne({ title: event.title, producer: payload.username });
    this.validator.existing(found);
    const create = await this.repository.create({ ...result, producer: payload.username });
    return create;
  }

  public async read(query: any): Promise<Array<IEvent>> {
    console.log(query);
    const found = await this.repository.read(query);
    return found;
  }
}
