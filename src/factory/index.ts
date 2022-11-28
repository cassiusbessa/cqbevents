import { IProducer, IProducerUpdate, 
  IProducerZodSchema as PSchema, IProducerZodSchemaUpdate as PUSchema,
  IBuyTicketZodSchema } from '../interfaces';
import { Producer } from '../database/models';
import { EventRepo, Repository } from '../database';
import { Validator, UserCases, EventCases, EventValidator } from '../useCases';
import { EventController, UserController } from '../controllers';
import { Jwt } from '../utils';

const producerRepo = new Repository<IProducer, IProducerUpdate>(Producer);
const producerValidator = new Validator<IProducer, IProducerUpdate>(PSchema, PUSchema);
const producerCases = new UserCases(producerRepo, producerValidator, new Jwt());
const producerController = new UserController(producerCases);

const eventRepo = new EventRepo();
const eventValidator = new EventValidator(IBuyTicketZodSchema);
const eventCases = new EventCases(eventRepo, eventValidator, new Jwt());
const eventController = new EventController(eventCases);

export { producerController, eventController };
