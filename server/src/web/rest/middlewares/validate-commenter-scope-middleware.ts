import { Middleware, MiddlewareMethods, Context } from '@tsed/common';
import { AppConfig } from '../config';
import { ForbiddenException } from '@web/rest/expections';
import { Logger } from '@domain/shared';

@Middleware()
export class ValidateCommenterScopeMiddleware implements MiddlewareMethods {
    public use(@Context() context: Context) {
        Logger.info('Validating scope...');
        const userScope = context.get(AppConfig.SCOPE_CONTEXT_KEY);

        if (!userScope) {
            throw new ForbiddenException('The scope is missing from the request. Please ensure that the scope is included in the request.');
        }

        if (userScope !== 'commenter') {
            throw new ForbiddenException('You do not have the required scope to access this resource. Required scope: commenter');
        }

        Logger.info('Scope validated successfully.');
    }
}

