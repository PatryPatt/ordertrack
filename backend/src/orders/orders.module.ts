import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderRepository } from './repositories/order.repository';
import { User } from '../users/entities/user.entity';
import { EventsModule } from '../mongo/events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderRepository, User]),
    EventsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
