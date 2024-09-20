import { UserRole } from '../users';

enum TokenType {
  ACCESS_TOKEN = 'access_token',
}

interface TokenFlattened {
  type: TokenType;
  sessionUuid: string;
  value: string;
  expiresAt: Date;
  userUuid: string;
  username: string;
  email: string;
  roles: string[];
}

abstract class Token {
  readonly type: TokenType;

  readonly value: string;

  readonly userUuid: string;

  readonly username: string;

  readonly email: string;

  readonly roles: UserRole[];

  constructor(
    type: TokenType,
    value: string,
    userUuid: string,
    username: string,
    email: string,
    roles: UserRole[],
  ) {
    this.type = type;
    this.value = value;
    this.userUuid = userUuid;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

export { Token, TokenFlattened, TokenType };
