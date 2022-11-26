/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ErrorRequestHandler, Response, Request, NextFunction,
} from 'express';

const ErrorHandler
: ErrorRequestHandler = (err, _req: Request, res: Response, _next: NextFunction): Response => {
  console.error(err);
  return res.status(err.status || 500).json({ error: err.message });
};

export default ErrorHandler;