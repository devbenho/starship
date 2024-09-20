import { Email, Property } from '@tsed/schema';
import {CommentResponseDto} from "@dtos/comments/comment.response";

class UserSuccessfullyAddedTheCommentApiResponse {
  @Property()
  readonly id: string;

  @Property()
  readonly text: string;

  @Property()
  readonly starshipId: string;

  @Property()
  readonly userId: string;

  @Property()
  readonly user: Pick<CommentResponseDto['user'], 'name' | 'email' | 'scope'>;

  @Property()
  readonly createdAt: Date;

  @Property()
  readonly updatedAt: Date;

  constructor(
      id: string,
      text: string,
      starshipId: string,
      userId: string,
      user: Pick<CommentResponseDto['user'], 'name' | 'email' | 'scope'>,
      createdAt: Date,
      updatedAt: Date
  ) {
    this.id = id;
    this.text = text;
    this.starshipId = starshipId;
    this.userId = userId;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static Create(
      id: string,
      text: string,
      starshipId: string,
      userId: string,
      user: Pick<CommentResponseDto['user'], 'name' | 'email' | 'scope'>,
      createdAt: Date,
      updatedAt: Date
  ): UserSuccessfullyAddedTheCommentApiResponse {
    return new UserSuccessfullyAddedTheCommentApiResponse(
        id,
        text,
        starshipId,
        userId,
        user,
        createdAt,
        updatedAt
    );
  }
}

export { UserSuccessfullyAddedTheCommentApiResponse };
