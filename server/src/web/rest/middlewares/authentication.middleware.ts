import { Context, Middleware, MiddlewareMethods, Req, Res } from '@tsed/common';
import { JwtPayload } from '@contracts/services/IJwt';
import { Authentication } from '@infrastructure/shared/authentication/authentication';
import { AuthenticationUtils } from '@infrastructure/shared/authentication/authentication-utils';
import { TriggeredByUser } from '@domain/shared/entities/triggered-by';
import { JwtTokenProvider } from '@infrastructure/shared/jwt/jwt-token-provider.domain-service';
import { ForbiddenException } from '../expections';
import { AppConfig } from '../config';
import { User, UserRepository } from '@domain/entities';

@Middleware()
class AuthenticationMiddleware implements MiddlewareMethods {
  constructor(
    private jwtTokenProvider: JwtTokenProvider,
    private userRepository: UserRepository,
  ) {}

  public async use(
    @Req() request: Req,
    @Res() response: Res,
    @Context() context: Context,
  ): Promise<void> {
    const token = this.getTokenFromRequest(request);
    if (!token) {
      throw new ForbiddenException();
    }

    const payload = this.jwtTokenProvider.verifyAccessToken(token);
    if (!payload) {
      throw new ForbiddenException();
    }

    const validatedSessionResponse = { accessToken: payload };

    this.ensureUserHasPrivileges(context, validatedSessionResponse);
    this.attachMetadataToContext(context, validatedSessionResponse);
  }

  private getTokenFromRequest(request: Req): string | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      return null;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }
    return parts[1];
  }

  private ensureUserHasPrivileges(
    context: Context,
    validatedSessionResponse: { accessToken: JwtPayload },
  ): void {
    const { scopes: allowedScopes = [] } =
      context.endpoint.get(AuthenticationMiddleware) || {};

    const userHasPrivileges =
      allowedScopes.length === 0 ||
      allowedScopes.some((scope: string) =>
        validatedSessionResponse.accessToken?.scope,
      );

    if (!userHasPrivileges) {
      throw new ForbiddenException();
    }
  }

  private attachMetadataToContext(
    context: Context,
    validatedSessionResponse: { accessToken: JwtPayload },
  ): void {
    const { accessToken } = validatedSessionResponse;

    if (accessToken != null) {
      const userScopes = accessToken.scope

      const authentication = Authentication.create(
        accessToken.userUuid.value,
        accessToken.email.value,
        userScopes.value, // Changed from userRoles to userScopes
      );
      context.set(AppConfig.AUTHENTICATION_CONTEXT_KEY, authentication);
      AuthenticationUtils.setAuthentication(authentication);

      const triggeredBy = new TriggeredByUser(
        accessToken.email.value,
        userScopes.value, // Changed from userRoles to userScopes
      );
      context.set(AppConfig.TRIGGERED_BY_CONTEXT_KEY, triggeredBy);

      // assign user to context
      this.ensureUserExists(context, validatedSessionResponse).then(user => {
        context.set(AppConfig.AUTHENTICATION_CONTEXT_KEY, user);
      });
    }
  }

  // ensure user exists

  private async ensureUserExists(
    context: Context,
    validatedSessionResponse: { accessToken: JwtPayload },
  ): Promise<User | null> {
    const { accessToken } = validatedSessionResponse;
    const user = await this.userRepository.findById(accessToken.userUuid.value);
    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}

export { AuthenticationMiddleware };
