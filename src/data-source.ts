// Solo es necesaria si usamos la CLI de TypeORM para crear o ejecutar migraciones.

import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import * as dotenv from 'dotenv';

dotenv.config(); // carga variables de entorno desde .env

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'postgres',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'user',
  password: process.env.POSTGRES_PASSWORD || 'password',
  database: process.env.POSTGRES_DB || 'app_db',
  entities: [User],
  migrations: ['src/migrations/*.ts'], // para generar migraciones en desarrollo
  //migrations: ['dist/migrations/*.js'], // Aquí irán las migraciones compiladas
  synchronize: false, // ⚠️ usa `false` en producción (migraciones harán el trabajo)
  logging: true,
});
