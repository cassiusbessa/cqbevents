import { IProducer, IProducerUpdate, 
  IProducerZodSchema as PSchema, IProducerZodSchemaUpdate as PUSchema } from '../interfaces';
import { Producer } from '../database/models';
import { Repository } from '../database';
import { BaseCases, Validator } from '../useCases';
import { BaseController } from '../controllers';

const producerRepo = new Repository<IProducer, IProducerUpdate>(Producer);
const producerValidator = new Validator<IProducer, IProducerUpdate>(PSchema, PUSchema);
const producerCases = new BaseCases<IProducer, IProducerUpdate>(producerRepo, producerValidator);
const producerController = new BaseController<IProducer, IProducerUpdate>(producerCases);

// eslint-disable-next-line import/prefer-default-export
export { producerController };
