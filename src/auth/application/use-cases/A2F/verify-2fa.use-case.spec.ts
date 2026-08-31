import * as otplib from 'otplib';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { User } from '../../../entities/user.entity';
import { Verify2FAUseCase } from './verify-2fa.use-case';

jest.mock('otplib', () => ({
  verify: jest.fn(),
}));

describe('Verify2FAUseCase', () => {
  let verify2FAUseCase: Verify2FAUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    verify2FAUseCase = new Verify2FAUseCase(userRepository);
    jest.clearAllMocks();
  });

  it('should successfully verify 2FA token and enable 2FA for user', async () => {
    const userId = 'user-123';
    const token = '123456';
    const mockUser = {
      get2FASecret: 'JBSWY3DPEHPK3PXP',
      enable2FA: jest.fn(),
    } as unknown as User;

    userRepository.findById.mockResolvedValue(mockUser);
    (otplib.verify as jest.Mock).mockResolvedValue({ valid: true });
    userRepository.save.mockResolvedValue(undefined);

    const result = await verify2FAUseCase.execute(userId, token);

    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(otplib.verify).toHaveBeenCalledWith({
      token,
      secret: mockUser.get2FASecret,
    });
    expect(mockUser.enable2FA).toHaveBeenCalled();
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toBe(true);
  });

  it('should throw an error if user is not found', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      verify2FAUseCase.execute('invalid-id', '123456'),
    ).rejects.toThrow('User not found');
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should throw an error if 2FA secret is not set up', async () => {
    const mockUser = {
      get2FASecret: null,
    } as unknown as User;

    userRepository.findById.mockResolvedValue(mockUser);

    await expect(
      verify2FAUseCase.execute('user-123', '123456'),
    ).rejects.toThrow('2FA secret is not set up for this user');
  });

  it('should throw an error if 2FA token is invalid', async () => {
    const mockUser = {
      get2FASecret: 'JBSWY3DPEHPK3PXP',
    } as unknown as User;

    userRepository.findById.mockResolvedValue(mockUser);
    (otplib.verify as jest.Mock).mockResolvedValue({ valid: false });

    await expect(
      verify2FAUseCase.execute('user-123', '000000'),
    ).rejects.toThrow('Invalid 2FA code');
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
