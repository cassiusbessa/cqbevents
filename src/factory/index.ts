import { IProducer, IProducerUpdate, 
  IProducerZodSchema as PSchema, IProducerZodSchemaUpdate as PUSchema,
  IEvent, IEventUpdate, IEventZodSchema as ESchema, IEventZodSchemaUpdate as EUSchema,
} from '../interfaces';
import { Producer, Event } from '../database/models';
import { Repository } from '../database';
import { BaseCases, Validator, UserCases } from '../useCases';
import { BaseController, UserController } from '../controllers';
import { Jwt } from '../utils';

const producerRepo = new Repository<IProducer, IProducerUpdate>(Producer);
const producerValidator = new Validator<IProducer, IProducerUpdate>(PSchema, PUSchema);
const producerCases = new UserCases(producerRepo, producerValidator, new Jwt());
const producerController = new UserController(producerCases);

const eventRepo = new Repository<IEvent, IEventUpdate>(Event);
const eventValidator = new Validator<IEvent, IEventUpdate>(ESchema, EUSchema);
const eventCases = new BaseCases(eventRepo, eventValidator);
const eventController = new BaseController<IEvent, IEventUpdate>(eventCases);

export { producerController, eventController };
