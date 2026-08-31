export class TotpSecret {
  private constructor(private readonly value: string) {}

  static create(secret: string): TotpSecret {
    if (!secret || secret.length < 16) {
      throw new Error('TOTP Secret must be at least 16 characters long');
    }
    return new TotpSecret(secret);
  }

  get getValue(): string {
    return this.value;
  }
}
