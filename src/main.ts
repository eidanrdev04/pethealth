import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
      const message = errors.map(error => ({
        field: error.property,
        constraints: Object.values(error.constraints),
      }));
      return new BadRequestException(message);
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('API de Tu Proyecto')
    .setDescription('Descripción de la API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('pets')
    .addTag('users')
    .addTag('vaccinations')
    .addTag('vaccination-records')
    .addTag('treatments')
    .addTag('Consultations')
    .addTag('Activities')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
