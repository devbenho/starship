import {UnauthorizedError} from '@contracts/errors/unauthorized.error';
import {BaseUseCase, UseCase} from '@application/shared';
import {Logger} from '@domain/shared';
import {UserResponseDto} from '@contracts/dtos/users';
import {CommentResponseDto} from '@contracts/dtos/comments/comment.response';
import {CommentModel} from '@infrastructure/comments/comment.model';
import {Comment} from "@domain/entities/comments/comment";
import {GetCommentsByStarshipId} from "@application/comments/get-comments-by-starship-id/get-comments-by-starship-id.request";
import {
    GetLikesByStarshipIdRequest
} from "@application/likes/get-likes-by-starship-id/get-likes-by-starship-id.request";
import {LikeResponseDto} from "@dtos/likes/like.response";
import {LikeModel} from "@infrastructure/likes/like.model";

@UseCase()
class GetLikesByStarshipIdUseCase extends BaseUseCase<GetLikesByStarshipIdRequest, LikeResponseDto[]> {

    constructor() {
        super();
    }

    public async performOperation(
        request: GetLikesByStarshipIdRequest,
    ): Promise<LikeResponseDto[]> {
        const likes = await LikeModel.find({ starshipId: request.starshipId }).populate('userId') as any;
        const result = likes.map((like: { _id: string; userId: { _id: string; name: any; email: any; scope: any; }; text: string; starshipId: string; createdAt: Date; updatedAt: Date; deletedAt: Date; }) => {
            return LikeResponseDto.Create(
                like._id,
                like.userId._id,
                {
                    name: like.userId.name,
                    email: like.userId.email,
                    scope: like.userId.scope,
                },
                like.text,
                like.starshipId,
                like.createdAt,
                like.updatedAt,
                like.deletedAt
            );
        });

        return result;
    }
}

export { GetLikesByStarshipIdUseCase };