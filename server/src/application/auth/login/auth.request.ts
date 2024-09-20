import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';
import { InvalidParameterException } from '@domain/shared/exceptions';

class AuthRequest extends UseCaseRequest {
  readonly triggeredBy: TriggeredBy;
  readonly login: string; // login is the email or username of the user
  readonly password: string;

  private constructor(
    triggeredBy: TriggeredBy,
    login: string,
    password: string,
  ) {
    super(triggeredBy);
    this.login = login;
    this.password = password;
  }

  public static create(
    triggeredBy: TriggeredBy,
    login: string,
    password: string,
  ): AuthRequest {
    return new AuthRequest(triggeredBy, login, password);
  }

  protected validatePayload(): void {
    if (this.login == null) {
      throw new InvalidParameterException('Email/Username must be provided');
    }

    if (this.password == null) {
      throw new InvalidParameterException('Password must be provided');
    }
  }
}

export { AuthRequest };
