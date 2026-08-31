import { User } from '../../entities/user.entity';

export interface IUserRepository {
  save(entity: User): Promise<void>;
  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;
  delete(entity: User): Promise<void>;
}
