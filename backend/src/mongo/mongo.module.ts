import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/app_mongo_db',
    ),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}

/*import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule, // para poder inyectar ConfigService
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const user = config.get<string>('MONGO_USER') || '';
        const pass = config.get<string>('MONGO_PASSWORD') || '';
        const host = config.get<string>('MONGO_HOST') || 'localhost';
        const port = config.get<string>('MONGO_PORT') || '27017';
        const db = config.get<string>('MONGO_DB') || 'app_mongo_db';
        const authSource = config.get<string>('MONGO_AUTH_SOURCE') || 'admin';

        // URI con autenticación (si no hay usuario/clave, se puede usar sin credenciales)
        const credentials = user
          ? `${encodeURIComponent(user)}:${encodeURIComponent(pass)}@`
          : '';
        const uri = `mongodb://${credentials}${host}:${port}/${db}?authSource=${authSource}`;

        return {
          uri,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}*/
