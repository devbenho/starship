import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity()
export class TestPersistence2 {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

@EventSubscriber()
export class TestSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return TestPersistence2;
  }

  async beforeInsert(event: InsertEvent<TestPersistence2>) {
    const { id } = event.entity;
    const hashedId = await bcrypt.hash(id, 10);
    event.entity.id = hashedId;
  }
}
