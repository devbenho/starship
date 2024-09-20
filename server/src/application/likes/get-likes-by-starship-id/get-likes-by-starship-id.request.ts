import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';
import { InvalidParameterException } from '@domain/shared/exceptions';

class GetLikesByStarshipIdRequest extends UseCaseRequest {
    readonly triggeredBy: TriggeredBy;
    readonly starshipId: string;

    private constructor(
        triggeredBy: TriggeredBy,
        starshipId: string,
    ) {
        super(triggeredBy);
        this.starshipId = starshipId;
    }

    public static create(
        triggeredBy: TriggeredBy,
        starshipId: string,
    ): GetLikesByStarshipIdRequest {
        return new GetLikesByStarshipIdRequest(triggeredBy, starshipId);
    }

    protected validatePayload(): void {
        if (this.starshipId == null) {
            throw new InvalidParameterException('StarshipId must be provided');
        }
    }
}

export { GetLikesByStarshipIdRequest };
