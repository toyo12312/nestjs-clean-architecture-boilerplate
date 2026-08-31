import { TotpSecret } from './totp-secret.vo';

describe('TotpSecret Value Object', () => {
  it('should successfully create a valid totp secret', () => {
    const validSecret = '1234567890abcdef';
    const totpSecretVO = TotpSecret.create(validSecret);

    expect(totpSecretVO).toBeDefined();
    expect(totpSecretVO.getValue).toBe(validSecret);
  });

  it('should throw an error if totp secret is too short or empty', () => {
    const invalidSecrets = ['', '12345', '1234567890abcde'];

    for (const invalid of invalidSecrets) {
      expect(() => TotpSecret.create(invalid)).toThrow(
        'TOTP Secret must be at least 16 characters long',
      );
    }
  });
});
