/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';
import { IRepository } from '../interfaces';

class Repository<T, U> implements IRepository<T, U> {
  protected model:Model<T>;

  constructor(model:Model<T>) {
    this.model = model;
  }

  public async create(obj:T):Promise<T> {
    return this.model.create({ ...obj });
  }

  public async read(where: any):Promise<Array<T>> {
    return this.model.find(where);
  }

  public async update(_id:string, obj: Partial<U>):Promise<T | null> {
    return this.model.findByIdAndUpdate(_id, obj, { new: true });
  }

  public async readOne(where:any):Promise<T | null> {
    return this.model.findOne(where);
  } 

  public async delete(_id:string):Promise<T | null> {
    return this.model.findByIdAndDelete(_id);
  }

  public async find(username: string, email: string): Promise<T | null> {
    return this.model.findOne({ $or: [{ username }, { email }] });
  }
}
export default Repository;
