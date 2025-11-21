import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])], // <--- registramos la entidad User y el repositorio
  controllers: [UsersController],
  providers: [UsersService, UserRepository], // <--- registramos el repositorio
  exports: [UsersService, UserRepository], // <--- registramos el repositorio
})
export class UsersModule {}
