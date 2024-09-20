/**
 * @summary
 * general validation exception can be used for another custom
 * exception, and it can be used for the validation exception
 * with the custom message where the message localized ar, en, etc... .
 * @param message the message of the error
 */
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { ValidationError };
