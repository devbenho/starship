import { TriggeredByUser } from '@domain/shared/entities';
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
import {
  UserSuccessfullyAddedTheCommentApiResponse
} from '@web/rest/controllers/comments/user-successfully-add-the-comment.api-response';
import { AppConfig } from '@web/rest/config';
import { WithAuth } from '@web/rest/shared/with-auth.decorator';
import { ScopeExtractionMiddleware } from '@web/rest/middlewares/extract-scope.middleware';
import {AddLikeUseCase} from "@application/likes/add-like.use-case";
import {
  GetLikesByStarshipIdUseCase
} from "@application/likes/get-likes-by-starship-id/get-likes-by-starship-id.use-case";
import {AddLikeRequest} from "@application/likes/add-like.request";
import {
  UserSuccessfullyAddedTheLikeApiResponse
} from "@web/rest/controllers/likes/user-successfully-add-the-like.api-response";
import {GetAllLikesApiResponse} from "@web/rest/controllers/likes/get-all-likes-api-response";
import {
  GetLikesByStarshipIdRequest
} from "@application/likes/get-likes-by-starship-id/get-likes-by-starship-id.request";
import {ValidateLikerScopeMiddleware} from "@web/rest/middlewares/validate-liker-scope.middleware";
import {Logger} from "@domain/shared";

@RestController('/:starshipId/likes')
@Tags({ name: 'Likes', description: 'Likes management' })
class LikesController {
  private _addLikeUseCase: AddLikeUseCase;
  private _getLikesByStarshipId: GetLikesByStarshipIdUseCase;

    constructor(
        addLikeUseCase: AddLikeUseCase,
        getLikesByStarshipId: GetLikesByStarshipIdUseCase,
    ) {
        this._addLikeUseCase = addLikeUseCase;
        this._getLikesByStarshipId = getLikesByStarshipId;
    }
  @Post('/')
  @WithAuth()
  @UseBefore(ScopeExtractionMiddleware)
  @UseBefore(ValidateLikerScopeMiddleware)
  @Title('Add Like')
  @Summary('Like a starship')
  @Description('Endpoint to add a like to a starship')
  @Returns(StatusCodes.OK, UserSuccessfullyAddedTheLikeApiResponse)
  @Status(StatusCodes.OK, UserSuccessfullyAddedTheLikeApiResponse)
  public async addLike(
      @Example('1') @BodyParams('text') text: string,
      @PathParams('starshipId') starshipId: string,
      @Context() ctx: Context,
  ): Promise<UserSuccessfullyAddedTheCommentApiResponse> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    if (!ctxBody) {
      throw new Error('No authentication context found');
    }
    const triggeredBy = new TriggeredByUser(ctxBody.userUuid, "");

    const request: AddLikeRequest = AddLikeRequest.create(triggeredBy, starshipId, text);

    Logger.info(`Adding like to starship ${request}`);
    const like = await this._addLikeUseCase.execute(request);

    return UserSuccessfullyAddedTheLikeApiResponse.Create(
        like.id,
        like.text,
        like.starshipId,
        like.userId,
        {
          name: like.user.name,
          email: like.user.email,
          scope: like.user.scope,
        },
        like.createdAt,
        like.updatedAt,
    );
  }

  @Get('/')
  @WithAuth()
  @UseBefore(ScopeExtractionMiddleware)
  @Title('Get all likes')
  @Summary('Get all likes on a starship')
  @Description('Endpoint to get all likes on a starship')
  @Returns(StatusCodes.OK, GetAllLikesApiResponse)
  @Status(StatusCodes.OK, GetAllLikesApiResponse)
  public async getLikes(
      @PathParams('starshipId') starshipId: string,
      @Context() ctx: Context,
  ): Promise<GetAllLikesApiResponse> {  // Change return type to GetAllLikesApiResponse
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    if (!ctxBody) {
      throw new Error('No authentication context found');
    }
    const triggeredBy = new TriggeredByUser(ctxBody.userUuid, "");
    const request = GetLikesByStarshipIdRequest.create(triggeredBy, starshipId);
    const likes = await this._getLikesByStarshipId.execute(request);

    const likesResponses = likes.map(like =>
        UserSuccessfullyAddedTheLikeApiResponse.Create(
            like.id,
            like.text,
            like.starshipId,
            like.userId,
            {
              name: like.user.name,
              email: like.user.email,
              scope: like.user.scope,
            },
            like.createdAt,
            like.updatedAt,
        )
    );

    return GetAllLikesApiResponse.Create(likesResponses.length, likesResponses);
  }
}

export { LikesController };