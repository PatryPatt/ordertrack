import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './repositories/order.repository';
import { EventsService } from '../mongo/events/events.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrderRepository,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly eventsService: EventsService, // inyectamos Mongo Events
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOneBy({
      id: createOrderDto.userId,
    });
    if (!user)
      throw new NotFoundException(
        `User with ID ${createOrderDto.userId} not found`,
      );

    const order = this.ordersRepository.create({
      description: createOrderDto.description,
      user,
    });

    const newOrder = await this.ordersRepository.save(order);

    // Evento creado en MongoDB
    await this.eventsService.create('ORDER_CREATED', {
      orderId: newOrder.id,
      userId: user.id,
      description: newOrder.description,
    });

    return newOrder;
  }

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    if (updateOrderDto.userId) {
      const user = await this.usersRepository.findOneBy({
        id: updateOrderDto.userId,
      });
      if (!user)
        throw new NotFoundException(
          `User with ID  
        ${updateOrderDto.userId} not found`,
        );
      order.user = user;
    }

    if (updateOrderDto.description) {
      order.description = updateOrderDto.description;
    }

    const updatedOrder = await this.ordersRepository.save(order);

    // Evento de actualización
    await this.eventsService.create('ORDER_UPDATED', {
      orderId: updatedOrder.id,
      userId: updatedOrder.user.id,
    });

    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersRepository.remove(order);

    // Evento de eliminación
    await this.eventsService.create('ORDER_DELETED', {
      orderId: id,
    });
  }
}
