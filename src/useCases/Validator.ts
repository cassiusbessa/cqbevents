/* eslint-disable class-methods-use-this */

import { SomeZodObject } from 'zod';
import { CustomError, httpStatusCode } from '../utils';

export default class Validator<T, U> {
  constructor(private schema: SomeZodObject, private updateSchema: SomeZodObject) {
    this.schema = schema;
    this.updateSchema = updateSchema;
  }

  public create = (entity: T) => {
    const valid = this.schema.safeParse(entity);
    if (!valid.success) {
      const message = valid.error.issues.map((issue) => issue.message).join(' | ');
      throw new CustomError(message, httpStatusCode.BAD_REQUEST);
    }
  };

  public update = (entity: U) => {
    const valid = this.updateSchema.safeParse(entity);
    if (!valid.success) {
      const message = valid.error.issues.map((issue) => issue.message).join(' | ');
      throw new CustomError(message, httpStatusCode.BAD_REQUEST);
    }
  };

  public idValidate = (id: string) => {
    const hexadecimal = id.length === 24;
    if (!hexadecimal) {
      throw new CustomError('Id must have 24 hexadecimal characters', httpStatusCode.BAD_REQUEST);
    }
  };

  public found = (entity: T | null) => {
    if (!entity) {
      throw new CustomError('Not found', httpStatusCode.NOT_FOUND);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public validateFields(fieldes: Array<any>): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const iterator of fieldes) {
      if (!iterator) {
        throw new CustomError('Missing fields', httpStatusCode.BAD_REQUEST);
      }
    }
  }
}
