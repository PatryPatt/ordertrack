import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // lanza error si envías propiedades extra
      transform: true, // convierte tipos automáticamente
    }),
  );

  // ✅ Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('OrderTrack API')
    .setDescription('API de gestión de usuarios y pedidos')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Aqui cambiamos la ruta
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'OrderTrack API Docs',
  });

  await app.listen(4000);
  console.log(`🚀 App running on http://localhost:3001`);
  console.log(`📘 Swagger Docs on http://localhost:3001/api/docs`);
}
void bootstrap();
