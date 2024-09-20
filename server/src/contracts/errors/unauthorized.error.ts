import ERROR_MESSAGES from '@domain/eums/error-messages.enum';
import { ApplicationError } from './application.error';

export class UnauthorizedError extends ApplicationError {
  constructor(message?: string) {
    super(401, message || ERROR_MESSAGES.UNAUTHORIZED);
  }
}

export class TokenExpiredError extends UnauthorizedError {
  constructor(...args: any[]) {
    super(ERROR_MESSAGES.TOKEN_EXPIRED);
  }
}

export class BadTokenError extends UnauthorizedError {
  constructor(...args: any[]) {
    super(ERROR_MESSAGES.BAD_TOKEN);
  }
}
