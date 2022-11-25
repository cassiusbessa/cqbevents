import { Request, Response, NextFunction } from 'express';

type CtrlFunc = (req: Request, res: Response) => Promise<Response>;

const CtrlWrapper = (func: CtrlFunc) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await func(req, res);
  } catch (error) {
    next(error);
  }
};

export default CtrlWrapper;