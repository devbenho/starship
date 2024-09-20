import {UnauthorizedError} from '@contracts/errors/unauthorized.error';
import {BaseUseCase, UseCase} from '@application/shared';
import {Logger} from '@domain/shared';
import {UserResponseDto} from '@contracts/dtos/users';
import {AddCommentRequest} from './add-comment.request';
import {CommentResponseDto} from '@contracts/dtos/comments/comment.response';
import {CommentModel} from '@infrastructure/comments/comment.model';
import {Comment} from "@domain/entities/comments/comment";
import {Schema, Types} from "mongoose";

@UseCase()
class AddCommentUsecase extends BaseUseCase<AddCommentRequest, CommentResponseDto> {

    constructor() {
        super();
    }

    public async performOperation(
        request: AddCommentRequest,
    ): Promise<CommentResponseDto> {

        const userId = new Types.ObjectId(request.triggeredBy.who).toString();
        const comment: Comment = Comment.Create(null, request.text, userId, new Date(), userId, request.starshipId, null, null, null);
        const createdComment = await CommentModel.create(comment);
        await createdComment.save();
        const populatedComment = await CommentModel.findById(createdComment.id).populate('userId') as any;
        if (!populatedComment) {
            throw new UnauthorizedError('Comment not found');
        }

        const result = CommentResponseDto.Create(
            populatedComment._id,
            populatedComment.userId._id,
            {
                name: populatedComment.userId.name,
                email: populatedComment.userId.email,
                scope: populatedComment.userId.scope,
            },
            populatedComment.text,
            populatedComment.starshipId,
            populatedComment.createdAt,
            populatedComment.updatedAt,
            populatedComment.deletedAt
        );

        return result;
    }
}

export {AddCommentUsecase};