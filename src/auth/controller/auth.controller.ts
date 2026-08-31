import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Generate2FASecretUseCase } from '../application/use-cases/A2F/generate-2fa-secret.use-case';
import { Verify2FAUseCase } from '../application/use-cases/A2F/verify-2fa.use-case';
import { RegisterCommand } from '../application/use-cases/register/register.command';
import { RegisterUseCase } from '../application/use-cases/register/register.use-case';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from './dto/user.response.dto';

@ApiTags('🔐 Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly generate2FASecretUseCase: Generate2FASecretUseCase,
    private readonly verify2FAUseCase: Verify2FAUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<UserResponseDto> {
    const command = new RegisterCommand(
      registerDto.email,
      registerDto.password,
    );

    return await this.registerUseCase.execute(command);
  }

  @Post('2fa/generate')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: { type: 'object', properties: { userId: { type: 'string' } } },
  })
  async generate2FA(@Body('userId') userId: string) {
    return await this.generate2FASecretUseCase.execute(userId);
  }

  @Post('2fa/verify')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: {
      type: 'object',
      properties: { userId: { type: 'string' }, token: { type: 'string' } },
    },
  })
  async verify2FA(
    @Body('userId') userId: string,
    @Body('token') token: string,
  ) {
    const isValid = await this.verify2FAUseCase.execute(userId, token);

    return {
      message: '2FA verified successfully!',
      success: isValid,
    };
  }
}
