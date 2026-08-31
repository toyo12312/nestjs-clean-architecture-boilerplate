import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ example: 'dev.expert@gmail.com' })
  email!: string;

  @ApiProperty({ example: false, description: 'Whether the email is verified' })
  isVerified!: boolean;
}
