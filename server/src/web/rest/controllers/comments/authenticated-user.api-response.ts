import { Default, Email, Enum, Property } from '@tsed/schema';
import { AuthResponseDto } from '@contracts/dtos/auth';
import {ScopeNames} from "@domain/entities/scopes/scope-enum";

class AuthenticatedUserApiResponse {
  @Property()
  readonly uuid: string;

  @Property()
  readonly name: string;


  @Email()
  readonly email: string;

  @Property()
  readonly phoneNumber: string;


  @Enum(ScopeNames)
  @Default(ScopeNames.LIKER)
  readonly scope: string;

  constructor(
    uuid: string,
    name: string,
    email: string,
    scope: string,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.scope = scope;
  }

  public static fromUserResponse(
    user: AuthResponseDto,
  ): AuthenticatedUserApiResponse {
    const userDetails = user.userDetails;
    return new AuthenticatedUserApiResponse(
        userDetails.id as string,
        userDetails.name,
        userDetails.email,
        userDetails.scopeId
    );
  }
}

export { AuthenticatedUserApiResponse };
