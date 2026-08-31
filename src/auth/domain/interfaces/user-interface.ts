import { Email } from '../value-objects/email.vo';
import { TotpSecret } from '../value-objects/totp-secret.vo';
export interface UserProps {
  email: Email;
  passwordHash: string;
  isEmailVerified: boolean;
  createdAt: Date;
  is2FAEnabled: boolean;
  twoFactorSecret: TotpSecret | null;
}
