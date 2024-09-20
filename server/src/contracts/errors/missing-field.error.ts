import { BadRequestError } from "./bad-request.error";


export class MissingFieldError extends BadRequestError {
  constructor(fieldName: string, ...args: any[]) {
    super(`${fieldName} is required`, ...args);
  }
}
