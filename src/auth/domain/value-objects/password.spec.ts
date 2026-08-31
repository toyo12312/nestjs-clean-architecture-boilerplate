import {
  USER_ERROR_MESSAGES,
  USER_VALIDATION_RULES,
} from '../constants/user-constant';
import { Password } from './password.vo';

describe('Password Value Object', () => {
  it('should successfully create a valid password', () => {
    const validPasswordStr = 'A'.repeat(
      USER_VALIDATION_RULES.PASSWORD_MIN_LENGTH,
    );
    const passwordVO = Password.create(validPasswordStr);

    expect(passwordVO).toBeDefined();
    expect(passwordVO.value).toBe(validPasswordStr);
  });

  it('should throw an error if password is too short', () => {
    const shortPasswordStr = 'A'.repeat(
      USER_VALIDATION_RULES.PASSWORD_MIN_LENGTH - 1,
    );

    expect(() => Password.create(shortPasswordStr)).toThrow(
      USER_ERROR_MESSAGES.PASSWORD_TOO_SHORT,
    );
  });
});
