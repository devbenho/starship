import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import { Scope } from '../scopes';

class User extends AuditableBaseEntity<string> {
  constructor(
      public id: Nullable<string>,
      public name: string,
      public email: string,
      public password: string,
      public scopeId: string,
      public createdAt: Date,
      public createdBy: string,
      public scope: Nullable<Scope>,
      public updatedAt: Nullable<Date>,
      public updatedBy: Nullable<string>,
  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy);
  }

  isPasswordMatched(password: string): boolean {
    return this.password === password;
  }

  public static create(
      id: Nullable<string>,
      name: string,
      email: string,
      password: string,
      scopeId: string, // scopeId is a foreign key
      createdAt: Date,
      createdBy: string,
      scope?: Nullable<Scope>,
      updatedAt?: Nullable<Date>,
      updatedBy?: Nullable<string>,
  ): User {
    return new User(
        id,
        name,
        email,
        password,
        scopeId,
        createdAt,
        createdBy,
        scope,
        updatedAt,
        updatedBy,
    );
  }
}

export { User };