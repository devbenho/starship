import { Nullable } from '@domain/shared';
import { Authentication } from '@infrastructure/shared/authentication';
import { AuthenticationUtils } from '@infrastructure/shared/authentication/authentication-utils';
import { AppConfig } from '@web/rest/config';
import { RequestUtils } from '@web/rest/infrastructure/request.utils';

import {
  TriggeredByAnonymous,
  TriggeredByUser,
} from '@domain/shared/entities/triggered-by';

import {
  Context,
  Middleware,
  MiddlewareMethods,
  OnResponse,
  Req,
} from '@tsed/common';
import { TokenProviderDomainService } from '@domain/shared/services/token-provider.domain-service';
import { JwtPayload } from '@contracts/services/IJwt';
import { Logger } from '../logger';

@Middleware()
class MetadataMiddleware implements MiddlewareMethods, OnResponse {
  private tokenProviderDomainService: TokenProviderDomainService;

  constructor(tokenProviderDomainService: TokenProviderDomainService) {
    this.tokenProviderDomainService = tokenProviderDomainService;
  }

  public use(@Req() request: Req, @Context() context: Context): void {
    let triggeredBy = new TriggeredByAnonymous();
    let authentication = Authentication.createEmpty();

    const accessTokenString = RequestUtils.getAccessToken(request);
    const accessToken = accessTokenString;
    const payload: Nullable<JwtPayload> = accessToken
      ? this.tokenProviderDomainService.verifyAccessToken(accessToken)
      : null;

    if (payload) {
      const scope = payload.scope.value;
      triggeredBy = new TriggeredByUser(payload.email.value, scope);
      authentication = Authentication.create(
        payload.userUuid.value,
        payload.email.value,
        scope,
      );
    }

    AuthenticationUtils.setAuthentication(authentication);
    context.set(AppConfig.AUTHENTICATION_CONTEXT_KEY, authentication);
    context.set(AppConfig.TRIGGERED_BY_CONTEXT_KEY, triggeredBy);
  }

  public $onResponse(): void {
    AuthenticationUtils.clearAuthentication();
  }
}

export { MetadataMiddleware };
