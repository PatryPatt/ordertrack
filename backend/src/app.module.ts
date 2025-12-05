import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { HealthModule } from './health/health.module';
import { DataSource } from 'typeorm';
import { MongoModule } from './mongo/mongo.module';
import { EventsModule } from './mongo/events/events.module';
import * as Joi from 'joi';
import { TestModule } from './mongo/test/test.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { ActivityInterceptor } from './common/interceptors/activity.interceptor';

@Module({
  imports: [
    // Cargar variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true, // hace que ConfigService esté disponible en toda la app
      envFilePath: ['.env', '.env.local'], // archivos de configuración
      // AQUI AÑADIMOS JOI
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        // Validación MongoDB
        MONGO_HOST: Joi.string().default('localhost'),
        MONGO_PORT: Joi.number().default(27017),
        MONGO_USER: Joi.string().optional(),
        MONGO_PASSWORD: Joi.string().optional(),
        MONGO_DB: Joi.string().default('app_mongo_db'),
        MONGO_AUTH_SOURCE: Joi.string().default('admin'),
      }),
    }),

    // Configurar conexión a PostgreSQL con TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('POSTGRES_HOST'),
        port: parseInt(config.get<string>('POSTGRES_PORT') || '5432', 10),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // cargamos automáticamente todas las entidades de dentro del proyecto
        synchronize: true, // Activado solo para desarrollo (crea tablas automáticamente)
        autoLoadEntities: true,
      }),
    }),

    // Módulos de la app
    UsersModule,
    OrdersModule,
    HealthModule,
    MongoModule,
    EventsModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // AÑADO → Registro del interceptor global
    {
      provide: APP_INTERCEPTOR,
      useClass: ActivityInterceptor,
    },
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}

  // Comprobación de conexión a PostgreSQL automática cuando arranca NestJS
  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT NOW()');
      console.log('✅ TypeORM conectado correctamente a PostgreSQL');
    } catch (err) {
      console.error('❌ Error al conectar a PostgreSQL:', err);
    }
  }
}
