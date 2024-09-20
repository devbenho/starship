import { User } from '@domain/entities';
import { ScopeNames } from '@domain/entities/scopes/scope-enum';

export class UserResponseDto {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public scopeId: string,
    public scope: ScopeNames,
  ) {}

  public static fromEntity(entity: User): UserResponseDto {
    return new UserResponseDto(
        entity.id as string,
        entity.name,
        entity.email,
        entity.scopeId,
        entity.scope?.name as ScopeNames,
    );
  }

  public static Create(
    id: string,
    name: string,
    email: string,
    scopeId: string,
    scope: ScopeNames,
  ): UserResponseDto {
    return new UserResponseDto(id, name, email, scopeId, scope);
  }
}
