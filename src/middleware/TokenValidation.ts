import { NextFunction, Request, Response } from 'express';
import { ITokenPayload } from '../interfaces';
import { CustomError, httpStatusCode, Jwt } from '../utils';

export default class TokenValidation {
  jwt = new Jwt();

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({ message: 'No token provided' });
    }
    try {
      const user = this.jwt.verifyToken(authorization);
      req.body.user = user as ITokenPayload;
      next();
    } catch (e) {
      console.log(e);
      const error = new CustomError('Token must be a valid token', httpStatusCode.UNAUTHORIZED);
      return res.status(error.status).json({ message: error.message });
    }
  };
}