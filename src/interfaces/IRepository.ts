interface IRepository<T, U> {
  create(obj:T):Promise<T>,
  read():Promise<Array<T>>,
  readOne(_id:string):Promise<T | null>,
  update(_id: string, obj:U):Promise<T | null>,
  delete(_id:string):Promise<T | null>
}

export default IRepository;
