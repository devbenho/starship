import { Res } from '@tsed/common';

import { Nullable } from '@domain/shared';
import { GlobalConfig } from '@infrastructure/shared/config';
import { AppConfig } from '@web/rest/config';

const ResponseUtils = {
  attachAccessAndRefreshTokens: (
    response: Res,
    accessToken: Nullable<string>,
    accessTokenExpiresAt: Date,
    refreshToken?: Nullable<string>,
    refreshTokenExpiresAt?: Nullable<Date>,
  ): void => {
    if (accessToken != null) {
      response.set(AppConfig.ACCESS_TOKEN_HEADER_NAME, accessToken);

      response.cookie(AppConfig.ACCESS_TOKEN_COOKIE_NAME, accessToken, {
        httpOnly: true,
        expires: accessTokenExpiresAt,
        secure: GlobalConfig.IS_PRODUCTION,
      });
    }

    if (refreshToken != null && refreshTokenExpiresAt != null) {
      response.set(AppConfig.REFRESH_TOKEN_HEADER_NAME, refreshToken);

      response.cookie(AppConfig.REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        expires: refreshTokenExpiresAt,
        secure: GlobalConfig.IS_PRODUCTION,
      });
    }
  },

  clearAccessAndRefreshTokens: (response: Res): void => {
    response.set(AppConfig.ACCESS_TOKEN_HEADER_NAME, 'deleted');
    response.clearCookie(AppConfig.ACCESS_TOKEN_COOKIE_NAME);

    response.set(AppConfig.REFRESH_TOKEN_HEADER_NAME, 'deleted');
    response.clearCookie(AppConfig.REFRESH_TOKEN_COOKIE_NAME);
  },
};

export { ResponseUtils };
