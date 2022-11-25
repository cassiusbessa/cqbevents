interface IRepository<T> {
  create(obj:T):Promise<T>,
  read():Promise<Array<T>>,
  readOne(_id:string):Promise<T | null>,
  update(_id: string, obj:T):Promise<T | null>,
  delete(_id:string):Promise<T | null>
}

export default IRepository;
