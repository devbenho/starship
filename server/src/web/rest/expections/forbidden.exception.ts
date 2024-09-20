import { StatusCodes } from 'http-status-codes';
import * as emoji from 'node-emoji';

import { ApiException } from './api.exception';

class ForbiddenException extends ApiException {
  constructor(
      message = `${emoji.get('no_entry_sign')} Forbidden.`,
  ) {
    super(
      StatusCodes.FORBIDDEN,
      'forbidden',
      `${emoji.get('no_entry_sign')} Forbidden.`,
    );
  }

    public static withMessage(message: string): ForbiddenException {
        return new ForbiddenException(message);
    }
}

export { ForbiddenException };
