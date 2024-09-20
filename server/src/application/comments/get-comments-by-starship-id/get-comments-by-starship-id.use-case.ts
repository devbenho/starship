import {UnauthorizedError} from '@contracts/errors/unauthorized.error';
import {BaseUseCase, UseCase} from '@application/shared';
import {Logger} from '@domain/shared';
import {UserResponseDto} from '@contracts/dtos/users';
import {CommentResponseDto} from '@contracts/dtos/comments/comment.response';
import {CommentModel} from '@infrastructure/comments/comment.model';
import {Comment} from "@domain/entities/comments/comment";
import {GetCommentsByStarshipId} from "@application/comments/get-comments-by-starship-id/get-comments-by-starship-id.request";

@UseCase()
class GetCommentsByStarshipIdUseCase extends BaseUseCase<GetCommentsByStarshipId, CommentResponseDto[]> {

    constructor() {
        super();
    }

    public async performOperation(
        request: GetCommentsByStarshipId,
    ): Promise<CommentResponseDto[]> {
        // get comments by starship id
        const comments = await CommentModel.find({ starshipId: request.starshipId }).populate('userId') as any;

        const result = comments.map((comment: { _id: string; userId: { _id: string; name: any; email: any; scope: any; }; text: string; starshipId: string; createdAt: Date; updatedAt: Date; deletedAt: Date; }) => {
            return CommentResponseDto.Create(
                comment._id,
                comment.userId._id,
                {
                    name: comment.userId.name,
                    email: comment.userId.email,
                    scope: comment.userId.scope,
                },
                comment.text,
                comment.starshipId,
                comment.createdAt,
                comment.updatedAt,
                comment.deletedAt
            );
        });

        return result;
    }
}

export { GetCommentsByStarshipIdUseCase };