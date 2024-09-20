import { Property } from '@tsed/schema';
import {
    UserSuccessfullyAddedTheLikeApiResponse
} from './user-successfully-add-the-like.api-response';

class GetAllLikesApiResponse {
    @Property()
    readonly count: number;

    @Property()
    readonly likes: UserSuccessfullyAddedTheLikeApiResponse[];

    constructor(count: number, likes: UserSuccessfullyAddedTheLikeApiResponse[]) {
        this.count = count;
        this.likes = likes;
    }

    public static Create(
        count: number,
        likes: UserSuccessfullyAddedTheLikeApiResponse[]
    ): GetAllLikesApiResponse {
        return new GetAllLikesApiResponse(count, likes);
    }
}

export { GetAllLikesApiResponse };