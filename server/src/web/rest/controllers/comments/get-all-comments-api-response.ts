import { Property } from '@tsed/schema';
import { UserSuccessfullyAddedTheCommentApiResponse } from './user-successfully-add-the-comment.api-response';

class GetAllCommentsApiResponse {
    @Property()
    readonly count: number;

    @Property()
    readonly comments: UserSuccessfullyAddedTheCommentApiResponse[];

    constructor(count: number, comments: UserSuccessfullyAddedTheCommentApiResponse[]) {
        this.count = count;
        this.comments = comments;
    }

    public static Create(
        count: number,
        comments: UserSuccessfullyAddedTheCommentApiResponse[]
    ): GetAllCommentsApiResponse {
        return new GetAllCommentsApiResponse(count, comments);
    }
}

export { GetAllCommentsApiResponse };