import { Email } from './email.vo';

describe('Email Value Object', () => {
  it('should successfully create an email and lowercase it', () => {
    const rawEmail = 'Test.User@Example.COM';
    const emailVO = Email.create(rawEmail);

    expect(emailVO).toBeDefined();
    expect(emailVO.value).toBe('test.user@example.com');
  });

  it('should throw an error for invalid email formats', () => {
    const invalidEmails = [
      'plainaddress',
      '@missingusername.com',
      'username@.com',
      'username@domain',
      'username@domain@com.ua',
      'user name@example.com',
    ];

    for (const invalid of invalidEmails) {
      expect(() => Email.create(invalid)).toThrow('Invalid email format');
    }
  });
});
