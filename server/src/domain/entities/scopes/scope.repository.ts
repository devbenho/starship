import {Scope} from "@domain/entities/scopes/scope";
import {Nullable} from "@domain/shared";

export abstract class ScopeRepository {
    abstract saveScope(scope: Scope): Promise<Scope>;
    abstract findByName(name: string): Promise<Scope | null>;
    abstract delete(scope: Scope): Promise<boolean>; // soft delete
    abstract updateScope(scope: Scope): Promise<Scope>;
    abstract findById(id: string): Promise<Nullable<Scope>>;
    abstract findAllByScopeIds(ids: string[]): Promise<Scope[]>;
}