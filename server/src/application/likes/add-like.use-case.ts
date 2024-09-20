import {UnauthorizedError} from '@contracts/errors/unauthorized.error';
import {BaseUseCase, UseCase} from '@application/shared';
import {Logger} from '@domain/shared';
import {UserResponseDto} from '@contracts/dtos/users';
import {AddLikeRequest} from './add-like.request';
import {CommentResponseDto} from '@contracts/dtos/comments/comment.response';
import {CommentModel} from '@infrastructure/comments/comment.model';
import {Comment} from "@domain/entities/comments/comment";
import {Schema, Types} from "mongoose";
import {LikeResponseDto} from "@dtos/likes/like.response";
import {LikeModel} from "@infrastructure/likes/like.model";
import {Like} from "@domain/entities/likes/like";

@UseCase()
class AddLikeUseCase extends BaseUseCase<AddLikeRequest, LikeResponseDto> {

    constructor() {
        super();
    }

    public async performOperation(
        request: AddLikeRequest,
    ): Promise<LikeResponseDto> {

        const userId = new Types.ObjectId(request.triggeredBy.who).toString();
        Logger.info(`Adding like for user ${userId}`);

        const isLikeExist = await LikeModel.findOne({ userId: userId, starshipId: request.starshipId });
        Logger.info(`Like exist ${isLikeExist}`);
        if (isLikeExist) {
            throw new UnauthorizedError('You have already liked this starship');
        }
        const like = Like.create(null, request.text, userId, new Date(), userId, request.starshipId);
        Logger.info(`Creating like ${like.userId}`);
        const createdLike = await LikeModel.create(like);
        await createdLike.save();
        const populatedLike = await LikeModel.findById(createdLike.id).populate('userId') as any;
        if (!populatedLike) {
            throw new UnauthorizedError('Like not found');
        }

        const result = LikeResponseDto.Create(
            populatedLike._id,
            populatedLike.userId._id,
            {
                name: populatedLike.userId.name,
                email: populatedLike.userId.email,
                scope: populatedLike.userId.scope,
            },
            populatedLike.text,
            populatedLike.starshipId,
            populatedLike.createdAt,
            populatedLike.updatedAt,
            populatedLike.deletedAt
        );

        return result;
    }
}

export {AddLikeUseCase};