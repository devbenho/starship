import {  Email, Property } from '@tsed/schema';

class UserSuccessfullyAuthenticatedApiResponse {
  @Property()
  readonly uuid: string;


  @Email()
  readonly email: string;

  @Property(String)
  readonly scopeId: string;

  @Property(String)
    readonly scope: string;
  
  @Property()
  readonly token: string;

    constructor(
        uuid: string,
        email: string,
        scopeId: string,
        token: string,
    ) {
      this.uuid = uuid;
      this.email = email;
      this.scopeId = scopeId;
      this.token = token;
    }

  public static Create(
    uuid: string,
    email: string,
    scopeId: string,
    token: string,
  ): UserSuccessfullyAuthenticatedApiResponse {
    return new UserSuccessfullyAuthenticatedApiResponse(
      uuid,
      email,
      scopeId,
      token,
    );
  }
}

export { UserSuccessfullyAuthenticatedApiResponse };
