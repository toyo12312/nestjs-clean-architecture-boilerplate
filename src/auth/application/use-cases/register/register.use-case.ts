import { ConflictException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../../../controller/dto/user.response.dto';
import {
  USER_DI_TOKENS,
  USER_ERROR_MESSAGES,
} from '../../../domain/constants/user-constant';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { Email } from '../../../domain/value-objects/email.vo';
import { Password } from '../../../domain/value-objects/password.vo';
import { User } from '../../../entities/user.entity';
import { UserMapper } from '../../mappers/user.mapper';
import { RegisterCommand } from './register.command';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject(USER_DI_TOKENS.USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: RegisterCommand): Promise<UserResponseDto> {
    const email = Email.create(command.email);
    const password = Password.create(command.password);

    const existingUser = await this.userRepository.findByEmail(email.value);
    if (existingUser) {
      throw new ConflictException(USER_ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password.value, 10);

    const user = User.create(email, hashedPassword);

    await this.userRepository.save(user);

    return UserMapper.toResponse(user);
  }
}
