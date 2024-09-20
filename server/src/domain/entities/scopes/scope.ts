import {AuditableBaseEntity} from "@domain/shared/auditable.entity";
import {ScopeNames} from "@domain/entities/scopes/scope-enum";

class Scope extends  AuditableBaseEntity<string> {
    constructor(
        public id: string,
        public name: ScopeNames,
        public createdAt: Date,
        public createdBy: string,
        public updatedAt: Date,
        public updatedBy: string,
    ) {
        super(id, createdAt, createdBy, updatedAt, updatedBy);
    }
    
    public static create(
        id: string,
        name: ScopeNames,
        createdAt: Date,
        createdBy: string,
        updatedAt: Date,
        updatedBy: string,
    ): Scope {
        return new Scope(
        id,
        name,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
        );
    }
}

export {Scope};