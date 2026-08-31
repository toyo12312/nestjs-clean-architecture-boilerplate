import { Inject, Injectable } from '@nestjs/common';
import { generateSecret, generateURI } from 'otplib';
import { IUserRepository } from '../../../domain/repositories/iuser.repository';
import { TotpSecret } from '../../../domain/value-objects/totp-secret.vo';

@Injectable()
export class Generate2FASecretUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(
    userId: string,
  ): Promise<{ qrCodeUrl: string; secret: string }> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.has2FA) {
      throw new Error('2FA is already enabled for this user');
    }

    const secret = generateSecret();

    const otpauthUrl = generateURI({
      secret: secret,
      label: user.email.value,
      issuer: 'Sandbox App',
    });

    const totpSecretVo = TotpSecret.create(secret);
    user.setup2FA(totpSecretVo);

    await this.userRepository.save(user);

    return {
      qrCodeUrl: otpauthUrl,
      secret: secret,
    };
  }
}
