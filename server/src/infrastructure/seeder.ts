// seed commenter and liker as a scope name into scope collection

import { ScopeModel } from '@infrastructure/scopes/scope.model';
import { ScopeNames } from '@domain/entities/scopes/scope-enum';
import { Scope } from '@domain/entities/scopes/scope';
import { Schema, Types } from 'mongoose';
export const seedScopes = async () => {
  const scopeNames = Object.values(ScopeNames);
  const scopes = scopeNames.map((scopeName) => {
    const scope = Scope.create(
      new Types.ObjectId().toString(),
      scopeName,
      new Date(),
      'system',
      new Date(),
      'system',
    );
    return scope;
  });

  await ScopeModel.insertMany(scopes);
};