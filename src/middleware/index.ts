import ErrorHandler from './ErrorHandler';
import TokenValidation from './TokenValidation';

const authMid = new TokenValidation();

// eslint-disable-next-line import/prefer-default-export
export { ErrorHandler, authMid };