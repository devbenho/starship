import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '@contracts/errors/application.error';
import { Logger } from '../logger';

export const errorHandlerMiddleware = (
  err: ApplicationError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  Logger.error(err);
  return res.status(err.code || 500).json({
    success: false,
    error: err.message || 'BOOM',
  });
};
