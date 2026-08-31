import * as otplib from 'otplib';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { User } from '../../../entities/user.entity';
import { Generate2FASecretUseCase } from './generate-2fa-secret.use-case';

jest.mock('otplib', () => ({
  generateSecret: jest.fn(),
  generateURI: jest.fn(),
}));

describe('Generate2FASecretUseCase', () => {
  let generate2FASecretUseCase: Generate2FASecretUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    generate2FASecretUseCase = new Generate2FASecretUseCase(userRepository);
    jest.clearAllMocks();
  });

  it('should successfully generate 2FA secret and QR code URI', async () => {
    const userId = 'user-123';
    const mockSecret = 'JBSWY3DPEHPK3PXP';
    const mockUri =
      'otpauth://totp/Sandbox%20App:test@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Sandbox%20App';

    const mockUser = {
      email: { value: 'test@example.com' },
      has2FA: false,
      setup2FA: jest.fn(),
    } as unknown as User;

    userRepository.findById.mockResolvedValue(mockUser);
    (otplib.generateSecret as jest.Mock).mockReturnValue(mockSecret);
    (otplib.generateURI as jest.Mock).mockReturnValue(mockUri);
    userRepository.save.mockResolvedValue(undefined);

    const result = await generate2FASecretUseCase.execute(userId);

    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(otplib.generateSecret).toHaveBeenCalled();
    expect(otplib.generateURI).toHaveBeenCalledWith({
      secret: mockSecret,
      label: mockUser.email.value,
      issuer: 'Sandbox App',
    });
    expect(mockUser.setup2FA).toHaveBeenCalled();
    expect(userRepository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual({
      qrCodeUrl: mockUri,
      secret: mockSecret,
    });
  });

  it('should throw an error if user is not found', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(
      generate2FASecretUseCase.execute('invalid-id'),
    ).rejects.toThrow('User not found');
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it('should throw an error if 2FA is already enabled', async () => {
    const mockUser = {
      has2FA: true,
    } as unknown as User;

    userRepository.findById.mockResolvedValue(mockUser);

    await expect(generate2FASecretUseCase.execute('user-123')).rejects.toThrow(
      '2FA is already enabled for this user',
    );
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
