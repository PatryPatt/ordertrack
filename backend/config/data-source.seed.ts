import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { validateSeedEnv } from './validate-seed-env';

// Cargar archivo .env.seed DE backend
dotenv.config({ path: __dirname + '/../.env.seed' });

// Validar variables con Joi
validateSeedEnv(process.env);

import { User } from '../src/users/entities/user.entity';
import { Order } from '../src/orders/entities/order.entity';

export const SeedDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Order],
  synchronize: true, // solo para desarrollo
});
