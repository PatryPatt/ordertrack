import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
