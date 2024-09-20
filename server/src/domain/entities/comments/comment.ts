import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';
import {User} from "@domain/entities";

class Comment extends AuditableBaseEntity<string> {
  constructor(
      public id: Nullable<string>,
      public text: string, // the content of the comment
      public userId: string, // the user who created the comment
      public createdAt: Date,
      public createdBy: string,
      public starshipId: string,
      public updatedAt: Nullable<Date>,
      public updatedBy: Nullable<string>,
      public user: Nullable<Pick<User, 'name' | 'email' | 'scope'>>, // the user who created the comment
  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy);
  }

  
    public static Create(
        id: Nullable<string>,
        text: string,
        userId: string,
        createdAt: Date,
        createdBy: string,
        starshipId: string,
        updatedAt: Nullable<Date>,
        updatedBy: Nullable<string>,
        user: Nullable<Pick<User, 'name' | 'email' | 'scope'>>,
    ): Comment{
        return new Comment(
            id,
            text,
            userId,
            createdAt,
            createdBy,
            starshipId,
            updatedAt,
            updatedBy,
            user
        );
    }
}

export { Comment };