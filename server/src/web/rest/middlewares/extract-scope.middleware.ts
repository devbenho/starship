import { Context, Middleware, MiddlewareMethods, Req, Res } from '@tsed/common';
import { JwtPayload } from '@contracts/services/IJwt';
import { JwtTokenProvider } from '@infrastructure/shared/jwt/jwt-token-provider.domain-service';
import { AppConfig } from '../config';
import {ForbiddenException} from "@web/rest/expections";

@Middleware()
class ScopeExtractionMiddleware implements MiddlewareMethods {
    constructor(private jwtTokenProvider: JwtTokenProvider) {}

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

        const { scope } = payload;

        // Attach scope to context
        this.attachScopeToContext(context, scope.value);
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

    private attachScopeToContext(context: Context, scope: string): void {
        if (scope) {
            context.set(AppConfig.SCOPE_CONTEXT_KEY, scope);
        } else {
            throw new ForbiddenException();
        }
    }
}

export { ScopeExtractionMiddleware };
