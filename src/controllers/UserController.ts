import { Request, Response } from 'express';
import { BaseController } from '.';
import { IProducer, IProducerUpdate } from '../interfaces';
import { UserCases } from '../useCases';
import { CtrlWrapper, httpStatusCode } from '../utils';

export default class UserController extends BaseController<IProducer, IProducerUpdate> {
  constructor(protected useCase: UserCases) {
    super(useCase);
  }

  public login = CtrlWrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const result = await this.useCase.login(body);
    return res.status(httpStatusCode.OK).json({ token: result });
  });

  public update = CtrlWrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const result = await this.useCase.update(body.user.id, body, body.user);
    return res.status(httpStatusCode.OK).json(result);
  });

  public delete = CtrlWrapper(async (req: Request, res: Response) => {
    const { id } = req.body.user;
    const result = await this.useCase.delete(id);
    return res.status(httpStatusCode.OK).json(result);
  });

  public readOne = CtrlWrapper(async (req: Request, res: Response) => {
    const { id } = req.body.user;
    const result = await this.useCase.readOne(id);
    return res.status(httpStatusCode.OK).json(result);
  });
}