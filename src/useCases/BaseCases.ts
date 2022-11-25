import { IRepository } from '../interfaces';
import Validator from './Validator';

export default class BaseCases<T, U> {
  constructor(private repository: IRepository<T, U>, private validator: Validator<T, U>) {
    this.repository = repository;
    this.validator = validator;
  }

  public async create(entity: T): Promise<T> {
    this.validator.create(entity);
    return this.repository.create(entity);
  }

  public async read(): Promise<Array<T>> {
    return this.repository.read();
  }

  public async readOne(id: string): Promise<T | null> {
    this.validator.validateFields([id]); 
    this.validator.idValidate(id);
    const entity = await this.repository.readOne(id);
    this.validator.found(entity);
    return entity;
  }

  public async update(id: string, entity: U): Promise<T | null> {
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
