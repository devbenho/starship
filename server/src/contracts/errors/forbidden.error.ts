import ERROR_MESSAGES from '@domain/eums/error-messages.enum';
import { ApplicationError } from './application.error';

export class ForbiddenError extends ApplicationError {
  constructor(message?: string, ...args: any[]) {
    super(403, message || ERROR_MESSAGES.FORBIDDEN, ...args);
  }
}
