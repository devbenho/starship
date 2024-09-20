import ERROR_MESSAGES from '@domain/eums/error-messages.enum';

export class ApplicationError extends Error {
  public code: number;

  constructor(code: number, message: string, ...args: any[]) {
    super(...args);
    this.code = code;
    this.message = message;
  }
}

export class InternalError extends ApplicationError {
  constructor(message?: string, ...args: any[]) {
    super(500, message || ERROR_MESSAGES.UNKNOWN_ERROR_TRY_AGAIN, ...args);
  }
}

export class EnvVariableMissingError extends InternalError {
  constructor(variableName: string, ...args: any[]) {
    super(`Environment variable ${variableName} is missing`, ...args);
  }
}
