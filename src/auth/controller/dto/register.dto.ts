import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { USER_VALIDATION_RULES } from '../../domain/constants/user-constant';

export class RegisterDto {
  @ApiProperty({
    example: 'dev.expert@gmail.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: 'StrongP@ssw0rd!',
    description: 'Password (minimum 8 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(USER_VALIDATION_RULES.PASSWORD_MIN_LENGTH)
  password!: string;
}
