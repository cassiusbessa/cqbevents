import { IProducer, IProducerUpdate, 
  IProducerZodSchema as PSchema, IProducerZodSchemaUpdate as PUSchema,
  IEvent, IEventUpdate } from '../interfaces';
import { Producer, Event } from '../database/models';
import { Repository } from '../database';
import { Validator, UserCases, EventCases, EventValidator } from '../useCases';
import { EventController, UserController } from '../controllers';
import { Jwt } from '../utils';

const producerRepo = new Repository<IProducer, IProducerUpdate>(Producer);
const producerValidator = new Validator<IProducer, IProducerUpdate>(PSchema, PUSchema);
const producerCases = new UserCases(producerRepo, producerValidator, new Jwt());
const producerController = new UserController(producerCases);

const eventRepo = new Repository<IEvent, IEventUpdate>(Event);
const eventValidator = new EventValidator();
const eventCases = new EventCases(eventRepo, eventValidator, new Jwt());
const eventController = new EventController(eventCases);

export { producerController, eventController };
