import {  Email, Property } from '@tsed/schema';

class GetMeApiResponse {
  @Property()
  readonly uuid: string;


  @Email()
  readonly email: string;

  @Property(String)
  readonly name: string;

  @Property(String)
  readonly scopeId: string;

  @Property(String)
  readonly scope: string;
  


  constructor(
    uuid: string,
    email: string,
    name: string,
    scopeId: string,
    scope: string,
  ) {
    this.uuid = uuid;
    this.email = email;
    this.name = name;
    this.scopeId = scopeId;
    this.scope = scope;
  }

  public static Create(
    uuid: string,
    email: string,
    name: string,
    scopeId: string,
    scope: string,
  ): GetMeApiResponse {
    return new GetMeApiResponse(uuid, email, name, scopeId, scope);
  }
}

export { GetMeApiResponse };
