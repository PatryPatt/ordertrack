import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // ✅ Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('OrderTrack API')
    .setDescription('API de gestión de usuarios y pedidos')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log(`🚀 App running on http://localhost:3001`);
  console.log(`📘 Swagger Docs on http://localhost:3001/api`);
}
void bootstrap();
