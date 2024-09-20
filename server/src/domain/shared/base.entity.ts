import { Nullable } from '@domain/shared/types';

abstract class BaseEntity<IdType> {
  constructor(public id: Nullable<IdType>) { }
}

export { BaseEntity };
