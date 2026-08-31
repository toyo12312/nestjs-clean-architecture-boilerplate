import { Module } from '@nestjs/common';
import { USER_DI_TOKENS } from '../auth/domain/constants/user-constant';
import { Generate2FASecretUseCase } from './application/use-cases/A2F/generate-2fa-secret.use-case';
import { Verify2FAUseCase } from './application/use-cases/A2F/verify-2fa.use-case';
import { RegisterUseCase } from './application/use-cases/register/register.use-case';
import { AuthController } from './controller/auth.controller';
import { InMemoryUserRepository } from './infrastructure/database/in-memory-user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    Generate2FASecretUseCase,
    Verify2FAUseCase,
    {
      provide: USER_DI_TOKENS.USER_REPOSITORY,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class AuthModule {}
