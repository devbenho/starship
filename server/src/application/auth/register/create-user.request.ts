import { UseCaseRequest } from '@application/shared';
import { TriggeredBy, TriggeredByUser } from '@domain/shared/entities';
import { User } from '@domain/entities';
import { Logger } from '@domain/shared';
import { InvalidParameterException } from '@domain/shared/exceptions';
import {id} from "inversify";

class CreateUserDto extends UseCaseRequest {
  constructor(
    public triggeredBy: TriggeredBy,
    public name: string,
    public email: string,
    public password: string,
    public scopeId: string,
  ) {
    super(triggeredBy);
    this.validate();
  }

  protected validatePayload(): void {
    if (
      !this.name ||
      !this.email ||
      !this.scopeId ||
      !this.password 
    ) {
     
      throw new InvalidParameterException('Invalid request: Missing required fields');
    }
  }

  public validate(): void {
    if (!this.triggeredBy) {
      throw new Error('The use case should be triggered by a user');
    }
    this.validatePayload();
  }

  public static create(
    triggeredBy: TriggeredByUser,
    name: string,
    email: string,
    password: string,
    scopeId: string,
  ): CreateUserDto {
    return new CreateUserDto(
      triggeredBy,
      name,
      email,
      password,
      scopeId,
    );
  }

  public toEntity(): User {
    return User.create(
        null,
        this.name,
        this.email,
        this.password,
        this.scopeId,
        new Date(),
        this.triggeredBy.who,
    )
  }
}

export { CreateUserDto };
