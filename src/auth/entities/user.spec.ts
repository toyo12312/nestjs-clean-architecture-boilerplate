import { Email } from '../domain/value-objects/email.vo';
import { TotpSecret } from '../domain/value-objects/totp-secret.vo';
import { User } from './user.entity';

describe('User Entity', () => {
  it('should successfully create a user with default properties', () => {
    const email = Email.create('test@example.com');
    const passwordHash = 'hashed_password_123';

    const user = User.create(email, passwordHash);

    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.isVerified).toBe(false);
    expect(user.has2FA).toBe(false);
    expect(user.get2FASecret).toBeNull();
  });

  it('should verify email successfully', () => {
    const user = User.create(Email.create('test@example.com'), 'hash');

    expect(user.isVerified).toBe(false);
    user.verifyEmail();
    expect(user.isVerified).toBe(true);
  });

  it('should setup and enable 2FA successfully', () => {
    const user = User.create(Email.create('test@example.com'), 'hash');
    const secret = TotpSecret.create('1234567890abcdef');

    user.setup2FA(secret);
    expect(user.get2FASecret).toBe(secret.getValue);
    expect(user.has2FA).toBe(false);

    user.enable2FA();
    expect(user.has2FA).toBe(true);
  });

  it('should throw an error if trying to enable 2FA without a secret', () => {
    const user = User.create(Email.create('test@example.com'), 'hash');

    expect(() => user.enable2FA()).toThrow(
      'Cannot enable 2FA without a secret key',
    );
  });

  it('should disable 2FA and clear secret', () => {
    const user = User.create(Email.create('test@example.com'), 'hash');
    const secret = TotpSecret.create('1234567890abcdef');

    user.setup2FA(secret);
    user.enable2FA();

    user.disable2FA();
    expect(user.has2FA).toBe(false);
    expect(user.get2FASecret).toBeNull();
  });
});
