import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';
import { InvalidParameterException } from '@domain/shared/exceptions';

class GetMeRequest extends UseCaseRequest {
  readonly triggeredBy: TriggeredBy;
  readonly userId: string;
  constructor(triggeredBy: TriggeredBy, userId: string) {
    super(triggeredBy);
    this.userId = userId;
  }

  protected validatePayload(): void {
    if (this.userId == null) {
      throw new InvalidParameterException('UserId must be provided');
    }
  }

  public static create(triggeredBy: TriggeredBy, userId: string): GetMeRequest {
    return new GetMeRequest(triggeredBy, userId);
  }
}

export { GetMeRequest };
