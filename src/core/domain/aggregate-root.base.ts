export abstract class AggregateRoot<T> {
  private readonly _id: string;
  protected readonly props: T;
  private _domainEvents: any[] = [];

  constructor(props: T, id?: string) {
    this._id = id ? id : crypto.randomUUID();
    this.props = props;
  }

  get id(): string {
    return this._id;
  }
  get domainEvents(): any[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: any): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
