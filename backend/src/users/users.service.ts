import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventsService } from '../mongo/events/events.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly eventsService: EventsService, // inyectamos Mongo Events
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    const newUser = await this.usersRepository.save(user);

    // Registramos el evento en MongoDB
    await this.eventsService.create('USER_CREATED', {
      userId: newUser.id,
      email: newUser.email,
    });

    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);

    // Evento: usuario eliminado
    await this.eventsService.create('USER_DELETED', {
      userId: id,
    });
  }
}
