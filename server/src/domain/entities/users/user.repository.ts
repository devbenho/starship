import { User } from '@domain/entities/users';
import { Nullable } from '@domain/shared/types';

export abstract class UserRepository {
  abstract saveUser(user: User): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract delete(user: User): Promise<boolean>; // soft delete
  abstract findByUsername(payload: string): Promise<User | null>;
  abstract isEmailExists(payload: string): Promise<boolean>;
  abstract isUsernameExists(payload: string): Promise<boolean>;
  abstract updateUser(user: User): Promise<User>;
  abstract findById(id: string): Promise<Nullable<User>>;
  abstract findAllByUserIds(ids: string[]): Promise<User[]>;
  abstract assignScopeToUser(userId: string, scopeId: string): Promise<boolean>;
}
