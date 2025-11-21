import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // Ejemplo de método personalizado
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}
