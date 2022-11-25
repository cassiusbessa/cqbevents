import { Model } from 'mongoose';
import { IRepository } from '../interfaces';

class Repository<T> implements IRepository<T> {
  private _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }

  public async create(obj:T):Promise<T> {
    return this._model.create({ ...obj });
  }

  public async read():Promise<Array<T>> {
    return this._model.find({});
  }

  public async update(_id:string, obj:Partial<T>):Promise<T | null> {
    return this._model.findByIdAndUpdate(_id, obj, { new: true, __v: 0 });
  }

  public async readOne(_id:string):Promise<T | null> {
    return this._model.findOne({ _id });
  }

  public async delete(_id:string):Promise<T | null> {
    return this._model.findByIdAndDelete(_id);
  }
}
export default Repository;
