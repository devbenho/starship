import { RequestHandler } from "express";

// Create generic type and append error prop to the Type T
type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  Record<string, string>,
  Partial<WithError<Res & { success: boolean }>>,
  Partial<Req>,
  any
>;
export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
