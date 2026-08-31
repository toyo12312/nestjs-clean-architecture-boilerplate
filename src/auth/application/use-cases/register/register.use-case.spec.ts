import { ConflictException } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { User } from '../../../entities/user.entity';
import { RegisterCommand } from './register.command';
import { RegisterUseCase } from './register.use-case';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<IUserRepository>;

    registerUseCase = new RegisterUseCase(userRepository);
  });

  it('should successfully register a new user', async () => {
    const command: RegisterCommand = {
      email: 'test@example.com',
      password: 'SecurePassword123!',
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.save.mockResolvedValue(undefined);

    const result = await registerUseCase.execute(command);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(command.email);
    expect(userRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });

  it('should throw ConflictException if user already exists', async () => {
    const command: RegisterCommand = {
      email: 'existing@example.com',
      password: 'SecurePassword123!',
    };

    // Імітуємо, що користувач уже існує в базі
    userRepository.findByEmail.mockResolvedValue({} as User);

    await expect(registerUseCase.execute(command)).rejects.toThrow(
      ConflictException,
    );
    expect(userRepository.save).not.toHaveBeenCalled();
  });
});
