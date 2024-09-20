import { UseCaseRequest } from '@application/shared';
import { TriggeredBy } from '@domain/shared/entities';
import { InvalidParameterException } from '@domain/shared/exceptions';

class GetCommentsByStarshipId extends UseCaseRequest {
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
    ): GetCommentsByStarshipId {
        return new GetCommentsByStarshipId(triggeredBy, starshipId);
    }

    protected validatePayload(): void {
        if (this.starshipId == null) {
            throw new InvalidParameterException('StarshipId must be provided');
        }
    }
}

export { GetCommentsByStarshipId };
