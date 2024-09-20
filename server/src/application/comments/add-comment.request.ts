import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';
import { InvalidParameterException } from '@domain/shared/exceptions';

class AddCommentRequest extends UseCaseRequest {
  readonly triggeredBy: TriggeredBy;
  readonly starshipId: string;
  readonly text: string;

  private constructor(
    triggeredBy: TriggeredBy,
    starshipId: string,
    text: string,
  ) {
    super(triggeredBy);
    this.starshipId = starshipId;
    this.text = text;
  }

    public static create(
        triggeredBy: TriggeredBy,
        starshipId: string,
        text: string,
    ): AddCommentRequest {
        return new AddCommentRequest(triggeredBy, starshipId, text);
    }
  
    protected validatePayload(): void {
        if (this.starshipId == null) {
            throw new InvalidParameterException('StarshipId must be provided');
        }
        if (this.text == null) {
            throw new InvalidParameterException('Text must be provided');
        }
    }
}

export { AddCommentRequest };
