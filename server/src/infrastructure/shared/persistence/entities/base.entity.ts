import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Nullable } from '@domain/shared/types';

Entity();
export class TestPersistence {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
