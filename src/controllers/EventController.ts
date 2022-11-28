import { Request, Response } from 'express';
import { curly } from 'node-libcurl';
import { httpStatusCode, CtrlWrapper } from '../utils';
import { EventCases } from '../useCases';
import { ITokenPayload } from '../interfaces';

export default class EventController {
  protected useCase: EventCases;

  constructor(useCase: EventCases) {
    this.useCase = useCase;
  }

  public create = CtrlWrapper(async (req: Request, res: Response) => {
    const { body } = req;
    const result = await this.useCase.create(body, body.user as ITokenPayload);
    return res.status(httpStatusCode.CREATED).json(result);
  });

  public getTickets = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.getTickets(query);
    return res.status(httpStatusCode.OK).json(result);
  });

  public getAttractions = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.getAttractions(query);
    return res.status(httpStatusCode.OK).json(result);
  });

  public read = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.read(query);
    return res.status(httpStatusCode.OK).json(result);
  });

  public me = CtrlWrapper(async (req: Request, res: Response) => {
    const { username } = req.body.user;
    const result = await this.useCase.me(username);
    return res.status(httpStatusCode.OK).json(result);
  });

  public soldTickets = CtrlWrapper(async (req: Request, res: Response) => {
    const result = await this.useCase.soldTickets(req.body);
    const { data } = await curly.post('http://localhost:3008/', {
      postFields: JSON.stringify({ quantidade: result.quantity, valor: result.total }),
      httpHeader: ['Content-Type: application/json'],
    });
    console.log(data);
    result.billing = data;
    return res.status(httpStatusCode.OK).json(result);
  });
}