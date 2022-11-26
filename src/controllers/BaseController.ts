import { Request, Response } from 'express';
import { httpStatusCode, CtrlWrapper } from '../utils';
import { BaseCases } from '../useCases';

export default class BaseController<T, U> {
  constructor(protected useCase: BaseCases<T, U>) {
    this.useCase = useCase;
  }

  public create = CtrlWrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const result = await this.useCase.create(body);
    return res.status(httpStatusCode.CREATED).json(result);
  });

  public read = CtrlWrapper(async (_req: Request, res: Response) => {
    const result = await this.useCase.read();
    return res.status(httpStatusCode.OK).json(result);
  });

  public readOne = CtrlWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.useCase.readOne(id);
    return res.status(httpStatusCode.OK).json(result);
  });

  public update = CtrlWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    const result = await this.useCase.update(id, body);
    return res.status(httpStatusCode.OK).json(result);
  });

  public delete = CtrlWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.useCase.delete(id);
    return res.status(httpStatusCode.OK).json(result);
  });
}
