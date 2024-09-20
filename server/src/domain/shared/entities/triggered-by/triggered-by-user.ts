import { TriggeredBy } from './triggered-by';

class TriggeredByUser extends TriggeredBy {
  readonly scope: string;

  constructor(user: string, scope: string) {
    super(user);
    this.scope = scope;
  }

  public isByAnonymous(): boolean {
    return false;
  }

  public isBySystem(): boolean {
    return false;
  }

  public isByUser(): boolean {
    return true;
  }
}

export { TriggeredByUser };