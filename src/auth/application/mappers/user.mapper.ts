import { UserResponseDto } from '../../controller/dto/user.response.dto';
import { User } from '../../entities/user.entity';

export class UserMapper {
  static toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email.value,
      isVerified: user.isVerified,
    };
  }
}
