import { IProducer, IProducerUpdate } from '../../interfaces/IProducers';
import { BaseCases, Validator } from '..';
import { IRepository, ITokenPayload } from '../../interfaces';
import { bcrypt, Jwt } from '../../utils';

export default class UserCases extends BaseCases<IProducer, IProducerUpdate> {
  constructor(
    protected repository: IRepository<IProducer, IProducerUpdate>, 
    protected validator: Validator<IProducer, IProducerUpdate>,
    protected jwt: Jwt,
    ) {
    super(repository, validator);
  }

  public async create(entity: IProducer) {
    this.validator.validateFields([entity.username, entity.email, entity.password]);
    this.validator.create(entity);
    const found = await this.repository.find(entity.username, entity.email);
    const pass = bcrypt.encryptPassword(entity.password);
    this.validator.existing(found);
    const create = await this.repository.create({ ...entity, password: pass });
    return { username: entity.username, email: entity.email, id: create._id };
  }

  public async login(entity: IProducer): Promise<string> {
    const found = await this.repository.find('', entity.email) as IProducer;
    this.validator.validateFields([entity.email, entity.password]);
    this.validator.found(found);
    await this.validator.passwordValidate(entity.password, found.password);
    const payload = { id: found._id, username: found.username, email: found.email };
    const token = this.jwt.generate(payload);
    return token;
  }

  public async update(id: string, entity: IProducerUpdate, payload: ITokenPayload)
  : Promise<IProducer | null> {
    this.validator.validateFields([id]);    
    this.validator.idValidate(id);
    const actual = await this.repository.readOne({ email: payload.email }) as IProducer;
    console.log(actual);
    this.validator.isOwner(actual._id as string, id);
    const found = await this.repository.find(entity.username as string, entity.email as string);
    this.validator.existing(found);
    const pass = entity.password ? bcrypt.encryptPassword(entity.password) : actual.password;
    const updated = await this.repository.update(id, { ...entity, password: pass });
    this.validator.found(updated);
    return updated;
  }
}