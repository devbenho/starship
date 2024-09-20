import { EventSubscriber, EntitySubscriberInterface } from "typeorm"

@EventSubscriber()
export class database implements EntitySubscriberInterface {

}
