import { TriggeredByUser } from '@domain/shared/entities';
import { AuthRequest } from '@contracts/dtos/auth';
import { LoginUseCase } from '@application/auth/login/login.use-case';
import { RegisterUsecase } from '@application/auth/register/register.use-case';
import {
  Description,
  Example,
  Post,
  Get,
  Returns,
  Status,
  Summary,
  Tags,
  Title,
} from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { BodyParams, Context, PathParams, UseBefore } from '@tsed/common';
import { RestController } from '@web/rest/infrastructure/rest-controller.decorator';
import { CreateUserDto } from '@contracts/dtos/users';
import { AddCommentUsecase } from '@application/comments/add-comment.use-case';
import {
  UserSuccessfullyAddedTheCommentApiResponse
} from '@web/rest/controllers/comments/user-successfully-add-the-comment.api-response';
import { AddCommentRequest } from '@application/comments/add-comment.request';
import { AppConfig } from '@web/rest/config';
import { Logger } from '@domain/shared';
import { WithAuth } from '@web/rest/shared/with-auth.decorator';
import {
  GetCommentsByStarshipId
} from '@application/comments/get-comments-by-starship-id/get-comments-by-starship-id.request';
import {
  GetCommentsByStarshipIdUseCase
} from '@application/comments/get-comments-by-starship-id/get-comments-by-starship-id.use-case';
import { withCommentPrivilege } from '@web/rest/shared/with-comment-privilege';
import { ScopeExtractionMiddleware } from '@web/rest/middlewares/extract-scope.middleware';
import { ValidateCommenterScopeMiddleware } from '@web/rest/middlewares/validate-commenter-scope-middleware';
import { GetAllCommentsApiResponse } from '@web/rest/controllers/comments/get-all-comments-api-response';

@RestController('/:starshipId/comments')
@Tags({ name: 'Comments', description: 'Add comment to the starship' })
class CommentsController {
  private _addCommentUseCase: AddCommentUsecase;
  private _getCommentsByStarshipIdUseCase: GetCommentsByStarshipIdUseCase;

  constructor(addCommentUseCase: AddCommentUsecase, getCommentsByStarshipId: GetCommentsByStarshipIdUseCase) {
    this._addCommentUseCase = addCommentUseCase;
    this._getCommentsByStarshipIdUseCase = getCommentsByStarshipId;
  }

  @Post('/')
  @WithAuth()
  @UseBefore(ScopeExtractionMiddleware)
  @UseBefore(ValidateCommenterScopeMiddleware)
  @Title('Add comment')
  @Summary('Comment on a starship')
  @Description('Endpoint to add a comment to a starship')
  @Returns(StatusCodes.OK, UserSuccessfullyAddedTheCommentApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAddedTheCommentApiResponse)
  public async addComment(
      @Example('this is the comment') @BodyParams('text') text: string,
      @PathParams('starshipId') starshipId: string,
      @Context() ctx: Context,
  ): Promise<UserSuccessfullyAddedTheCommentApiResponse> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    if (!ctxBody) {
      throw new Error('No authentication context found');
    }
    const triggeredBy = new TriggeredByUser(ctxBody.userUuid, "");
    const request: AddCommentRequest = AddCommentRequest.create(triggeredBy, starshipId, text);
    const comment = await this._addCommentUseCase.execute(request);

    return UserSuccessfullyAddedTheCommentApiResponse.Create(
        comment.id,
        comment.text,
        comment.starshipId,
        comment.userId,
        {
          name: comment.user.name,
          email: comment.user.email,
          scope: comment.user.scope,
        },
        comment.createdAt,
        comment.updatedAt,
    );
  }

  @Get('/')
  @WithAuth()
  @UseBefore(ScopeExtractionMiddleware)
  @Title('Get all comments')
  @Summary('Get all Comments on a starship')
  @Description('Endpoint to get all comments on a starship')
  @Returns(StatusCodes.OK, GetAllCommentsApiResponse)
  @Status(StatusCodes.OK, GetAllCommentsApiResponse)
  public async getComments(
      @PathParams('starshipId') starshipId: string,
      @Context() ctx: Context,
  ): Promise<GetAllCommentsApiResponse> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    if (!ctxBody) {
      throw new Error('No authentication context found');
    }
    const triggeredBy = new TriggeredByUser(ctxBody.userUuid, "");
    const request = GetCommentsByStarshipId.create(triggeredBy, starshipId);
    const comments = await this._getCommentsByStarshipIdUseCase.execute(request);

    const commentResponses = comments.map(comment =>
        UserSuccessfullyAddedTheCommentApiResponse.Create(
            comment.id,
            comment.text,
            comment.starshipId,
            comment.userId,
            {
              name: comment.user.name,
              email: comment.user.email,
              scope: comment.user.scope,
            },
            comment.createdAt,
            comment.updatedAt,
        )
    );

    return GetAllCommentsApiResponse.Create(comments.length, commentResponses);
  }
}

export { CommentsController };