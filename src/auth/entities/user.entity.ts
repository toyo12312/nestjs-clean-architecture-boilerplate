import { AggregateRoot } from '../../core/domain/aggregate-root.base';
import { UserProps } from '../domain/interfaces/user-interface';
import { Email } from '../domain/value-objects/email.vo';
import { TotpSecret } from '../domain/value-objects/totp-secret.vo';

export class User extends AggregateRoot<UserProps> {
  twoFactorSecret: any;
  getEmail() {
    throw new Error('Method not implemented.');
  }
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public static create(email: Email, passwordHash: string): User {
    const user = new User({
      email,
      passwordHash,
      isEmailVerified: false,
      createdAt: new Date(),
      is2FAEnabled: false,
      twoFactorSecret: null,
    });

    return user;
  }

  setup2FA(secret: TotpSecret): void {
    this.props.twoFactorSecret = secret;
  }

  enable2FA(): void {
    if (!this.props.twoFactorSecret) {
      throw new Error('Cannot enable 2FA without a secret key');
    }
    this.props.is2FAEnabled = true;
  }
  disable2FA(): void {
    this.props.is2FAEnabled = false;
    this.props.twoFactorSecret = null;
  }

  get email(): Email {
    return this.props.email;
  }

  get isVerified(): boolean {
    return this.props.isEmailVerified;
  }

  public verifyEmail(): void {
    this.props.isEmailVerified = true;
  }
  get has2FA(): boolean {
    return this.props.is2FAEnabled;
  }

  get get2FASecret(): string | null {
    return this.props.twoFactorSecret
      ? this.props.twoFactorSecret.getValue
      : null;
  }
}
