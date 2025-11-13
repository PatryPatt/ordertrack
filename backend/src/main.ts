import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar validaciones globales con class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // lanza error si llegan propiedades no permitidas
      transform: true, // convierte tipos automáticamente segun DTO
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('OrderTrack API')
    .setDescription('Documentación de la API con NestJS + Swagger')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  // Aqui cambiamos la ruta
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'OrderTrack API Docs',
  });

  // Puerto desde variable de entorno
  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 App running on http://localhost:${port}`);
  console.log(`📘 Swagger Docs on http://localhost:${port}/api/docs`);
}
void bootstrap();
