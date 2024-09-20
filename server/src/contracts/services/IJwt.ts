import {ScopeNames} from "@domain/entities/scopes/scope-enum";

export interface JwtPayload {
  userUuid: { value: string };
  email: { value: string };
  scope: { value: ScopeNames };
}
