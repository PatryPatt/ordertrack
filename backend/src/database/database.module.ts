import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { Order } from '../orders/entities/order.entity';

// Todas las entidades de la aplicación están en un solo lugar y así es más fácil de mantener.
@Global() // hace que este módulo esté disponible en toda la app sin importar importación
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ // Nos permite cargar la configuración de manera asíncrona, muy útil en entornos que cambian las variables según el entorno.
      imports: [ConfigModule], // para poder usar variables de entorno, usamos .env
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Order],
        synchronize: true, // solo en desarrollo, en producción debemos usar migrations
        logging: true,     // nos ayuda a debuggear queries
      }),
    }),
    TypeOrmModule.forFeature([User, Order]), // exporta repositorios para inyección
  ],
  exports: [TypeOrmModule], // permite usar TypeOrmModule en otros módulos
})
export class DatabaseModule {}
