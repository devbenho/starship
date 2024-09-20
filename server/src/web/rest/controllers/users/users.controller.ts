import { TriggeredByUser } from '@domain/shared/entities';
import { AuthRequest } from '@contracts/dtos/auth';
import {
  Description,
  Example,
  Get,
  Post,
  Returns,
  Status,
  Summary,
  Tags,
  Title,
} from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { RestController } from '@web/rest/infrastructure/rest-controller.decorator';
import { GetMeApiResponse } from './get-me.api-response';
import { GetMeUseCase } from '@application/users/get-me/get-me.use-case';
import { WithAuth } from '@web/rest/shared/with-auth.decorator';
import { AppConfig } from '@web/rest/config';
import { Context } from '@tsed/common';
import { GetMeRequest } from '@application/users/get-me/get-me.request';

@RestController('/users')
@Tags({ name: 'Users', description: 'Users management' })
class UsersController {
  private _getMeUseCase: GetMeUseCase;

  constructor(
    private readonly getMeUseCase: GetMeUseCase,
  ) {
    this._getMeUseCase = getMeUseCase;
  }

  @Get('/me')
  @Title('Get Me')
  @Summary('Get my data')
  @Description('Endpoint to get the data of the authenticated user')
  @WithAuth()
  @Returns(StatusCodes.OK, GetMeApiResponse)
  @Status(StatusCodes.OK, GetMeApiResponse)
  public async getMe(
    @Context() ctx: Context,
  ): Promise<GetMeApiResponse> {
    const ctxBody = ctx.get(AppConfig.AUTHENTICATION_CONTEXT_KEY);
    if (!ctxBody) {
      throw new Error('No authentication context found');
    }
    const triggeredBy = new TriggeredByUser(ctxBody.userUuid, "");

    const currentUser = await this.getMeUseCase.execute(
      GetMeRequest.create(triggeredBy, ctxBody.userUuid),
    );

    return GetMeApiResponse.Create(currentUser.id, currentUser.email, currentUser.name, currentUser.scopeId, currentUser.scope);
  }
}

export { UsersController };
