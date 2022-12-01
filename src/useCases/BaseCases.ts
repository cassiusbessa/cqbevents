import { IRepository } from '../interfaces';
import ITokenPayload from '../interfaces/ITokenPayload';
import Validator from './Validator';

export default class BaseCases<T, U> {
  constructor(protected repository: IRepository<T, U>, protected validator: Validator<T, U>) {
    this.repository = repository;
    this.validator = validator;
  }

  public async create(entity: T): Promise<Partial<T>> {
    this.validator.create(entity);
    return this.repository.create(entity);
  }

  public async read(): Promise<Array<T>> {
    return this.repository.read({});
  }

  public async readOne(where: any): Promise<T | null> {
    const entity = await this.repository.readOne({ where });
    this.validator.found(entity);
    return entity;
  }

  public async update(id: string, entity: U, _payload?: ITokenPayload): Promise<T | null> {
    this.validator.validateFields([id]);    
    this.validator.idValidate(id);
    const updated = await this.repository.update(id, entity);
    this.validator.found(updated);
    return updated;
  }

  public async delete(id: string): Promise<T | null> {
    this.validator.idValidate(id);
    const deleted = await this.repository.delete(id);
    this.validator.found(deleted);
    return deleted;
  }
}
