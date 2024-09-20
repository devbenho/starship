import { UseAuth } from '@tsed/common';
import { useDecorators } from '@tsed/core';
import { Returns, Security } from '@tsed/schema';
import { StatusCodes } from 'http-status-codes';
import { ExceptionApiResponse } from '../expections';
import { ScopeNames } from '@domain/entities/scopes/scope-enum';
import {ValidateCommenterScopeMiddleware} from "@web/rest/middlewares/validate-commenter-scope-middleware";

// Options interface for decorators
interface PrivilegeOptions {
    scope: Record<string, unknown>;
}

// Helper function to create privilege-based decorators
const WithPrivilege = (options: {}): any => {
    return useDecorators(
        UseAuth(ValidateCommenterScopeMiddleware, options), // Use ValidateScopeMiddleware
        Security('Bearer'),
        Returns(StatusCodes.UNAUTHORIZED, ExceptionApiResponse),
        Returns(StatusCodes.FORBIDDEN, ExceptionApiResponse)
    );
};

// Decorator for comment privilege
const withCommentPrivilege = (): any => {
    return WithPrivilege({ scope: ScopeNames.COMMENTER }); 
};

// Decorator for like privilege
const withLikePrivilege = (): any => {
    return WithPrivilege({ scope: 'liker' });
};

export { withCommentPrivilege, withLikePrivilege };
