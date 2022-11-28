import { Request, Response } from 'express';
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

  public read = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.read(query);
    return res.status(httpStatusCode.OK).json(result);
  });

  public ticketsDateSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.ticketsDateSearch(query.date as string);
    return res.status(httpStatusCode.OK).json(result);
  });

  public ticketsPriceSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.ticketsPriceSearch(+(query.price as string) as number);
    return res.status(httpStatusCode.OK).json(result);
  });

  public attractionsDateSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.attractionsDateSearch(query.date as string);
    return res.status(httpStatusCode.OK).json(result);
  });

  public attractionsNameSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.attractionsNameSearch(query.name as string);
    return res.status(httpStatusCode.OK).json(result);
  });

  public genreSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.genreSearch(query.genre as string);
    return res.status(httpStatusCode.OK).json(result);
  });

  public producerSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.producerSearch(query.producer as string);
    return res.status(httpStatusCode.OK).json(result);
  });

  public titleSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.titleSearch(query.title as string);
    return res.status(httpStatusCode.OK).json(result);
  });

  public localSearch = CtrlWrapper(async (req: Request, res: Response) => {
    const { query } = req;
    const result = await this.useCase.localSearch(query.local as string);
    return res.status(httpStatusCode.OK).json(result);
  });
}