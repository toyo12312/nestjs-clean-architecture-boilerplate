import { Email } from '../../domain/value-objects/email.vo';
import { User } from '../../entities/user.entity';
import { UserMapper } from './user.mapper';

describe('UserMapper', () => {
  it('should map User entity to UserResponseDto correctly', () => {
    const mockEmail = Email.create('test@example.com');

    const user = {
      id: '123-uuid',
      email: mockEmail,
      isVerified: true,
      passwordHash: 'hashed_password_123',
    } as unknown as User;

    const result = UserMapper.toResponse(user);

    expect(result).toEqual({
      id: '123-uuid',
      email: 'test@example.com',
      isVerified: true,
    });

    expect((result as any).passwordHash).toBeUndefined();
  });
});
