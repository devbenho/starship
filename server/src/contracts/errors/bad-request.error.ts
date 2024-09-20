import ERROR_MESSAGES from '@domain/eums/error-messages.enum';
import { ApplicationError } from './application.error';

export class BadRequestError extends ApplicationError {
  constructor(message: string, ...args: any[]) {
    super(400, message, ...args);
  }
}

export class InvalidIdError extends BadRequestError {
  constructor(...args: any[]) {
    super(ERROR_MESSAGES.REPOSITORY_ERROR_INVALID_ID, ...args);
  }
}

export class RepositoryMissingField extends BadRequestError {
  constructor(...args: any[]) {
    super('Field missing', ...args);
  }
}
