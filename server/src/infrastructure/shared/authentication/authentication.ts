import {  ScopeNames } from '@domain/entities/scopes/scope-enum';
import { Nullable } from '@domain/shared';

export class Authentication {
  constructor(
    public userUuid: Nullable<string>,
    public email: Nullable<string>,
    public scope: Nullable<ScopeNames>,
  ) {}

  public static create(
    userUuid: string,
    email: string,
    scope: ScopeNames,
  ): Authentication {
    return new Authentication(userUuid, email, scope);
  }

  public static createEmpty(): Authentication {
    return new Authentication(null, null, null);
  }
}
