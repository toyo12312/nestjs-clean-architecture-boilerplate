import { Injectable, Logger } from '@nestjs/common';
import { IUserRepository } from '../../domain/repositories/iuser.repository';
import { User } from '../../entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[] = [];
  private readonly logger = new Logger(InMemoryUserRepository.name);

  // eslint-disable-next-line @typescript-eslint/require-await
  async save(entity: User): Promise<void> {
    this.users.push(entity);
    this.logger.log(`✅ Користувач збережений в БД: ${entity.email.value}`);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email.value === email) || null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async delete(entity: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === entity.id);
    if (index > -1) {
      this.users.splice(index, 1);
    }
  }
}
