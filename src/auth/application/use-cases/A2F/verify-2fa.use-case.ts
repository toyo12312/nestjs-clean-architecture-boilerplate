import { Inject, Injectable } from '@nestjs/common';
import { verify } from 'otplib';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';

@Injectable()
export class Verify2FAUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, token: string): Promise<boolean> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const secret = user.get2FASecret;

    if (!secret) {
      throw new Error('2FA secret is not set up for this user');
    }

    const result = await verify({
      token: token,
      secret: secret,
    });

    if (!result.valid) {
      throw new Error('Invalid 2FA code');
    }

    user.enable2FA();

    await this.userRepository.save(user);

    return true;
  }
}
