import { ValueObject } from '../../../core/domain/value-object.base';

export interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Email {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      throw new Error('Invalid email format');
    }

    return new Email({ value: email.toLowerCase() });
  }

  get value(): string {
    return this.props.value;
  }
}
