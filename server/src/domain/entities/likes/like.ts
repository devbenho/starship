import { AuditableBaseEntity } from '@domain/shared/auditable.entity';
import { Nullable } from '@domain/shared/types';

class Like extends AuditableBaseEntity<string> {
  constructor(
      public id: Nullable<string>,
      public text: string, // text is the content of the like which is "1"
      public userId: string, // userId is the user who created the like
      public createdAt: Date,
      public createdBy: string,
      public starshipId: string,
      public updatedAt: Nullable<Date>,
      public updatedBy: Nullable<string>,
  ) {
    super(id, createdAt, createdBy, updatedAt, updatedBy);
  }

  
    public static create(
        id: Nullable<string>,
        text: string,
        userId: string,
        createdAt: Date,
        createdBy: string,
        starshipId: string,
        updatedAt?: Nullable<Date>,
        updatedBy?: Nullable<string>,
    ): Like {
        return new Like(
            id,
            text,
            userId,
            createdAt,
            createdBy,
            starshipId,
            updatedAt,
            updatedBy,
        );
    }
}

export { Like };