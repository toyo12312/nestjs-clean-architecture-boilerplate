import { ValueObject } from '../../../core/domain/value-object.base';
import {
  USER_ERROR_MESSAGES,
  USER_VALIDATION_RULES,
} from '../constants/user-constant';

export interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  private constructor(props: PasswordProps) {
    super(props);
  }

  public static create(password: string): Password {
    if (password.length < USER_VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
      throw new Error(USER_ERROR_MESSAGES.PASSWORD_TOO_SHORT);
    }

    return new Password({ value: password });
  }

  get value(): string {
    return this.props.value;
  }
}
