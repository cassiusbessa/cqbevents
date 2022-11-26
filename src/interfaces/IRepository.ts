/* eslint-disable @typescript-eslint/no-explicit-any */
interface IRepository<T, U> {
  create(obj:T):Promise<T>,
  read(where: any):Promise<Array<T>>,
  readOne(where: any):Promise<T | null>,
  update(_id: string, obj:U):Promise<T | null>,
  delete(_id:string):Promise<T | null>,
  find(username: string, email: string): Promise<T | null>
}

export default IRepository;
