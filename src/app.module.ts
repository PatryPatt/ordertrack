import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    // Cargar variables de entorno globalmente
    ConfigModule.forRoot({
      isGlobal: true, // disponible en toda la app
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
        entities: [User],
        synchronize: true, // Activado solo para desarrollo (crea tablas automáticamente)
        autoLoadEntities: true,
      }),
    }),

    // Módulos de la app
    UsersModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
