import ERROR_MESSAGES from '@domain/eums/error-messages.enum';
import { ApplicationError } from './application.error';

export class NotFoundError extends ApplicationError {
  constructor(message?: string, ...args: any[]) {
    super(404, message || ERROR_MESSAGES.NOT_FOUND, ...args);
  }
}
