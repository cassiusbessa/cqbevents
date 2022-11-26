import { sign, SignOptions, verify } from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces';
/* eslint-disable class-methods-use-this */

const SECRET = process.env.JWT_SECRET || 'segredosecreto';

const jwtDefaultConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
class Jwt {
  private jwtConfig = jwtDefaultConfig;

  public generate(payload: ITokenPayload) {
    return sign(payload, SECRET, this.jwtConfig);
  }

  public verifyToken = (token: string) => {
    const user = verify(token, SECRET);
    return user;
  };
}

export default Jwt;
