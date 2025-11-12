import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { Order } from '@orders/entities/order.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres', // ❌ no uses 'localhost'
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'app_db',
  entities: [User, Order],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
  url: process.env.DATABASE_URL,
});
