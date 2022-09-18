import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config';
import { AllExceptionFilter } from './errors/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'error', 'log', 'verbose', 'warn'],
  });

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.APP_VERSION);

  const configSwagger = new DocumentBuilder()
    .setBasePath(config.APP_VERSION)
    .setTitle('Zing MP3 API')
    .setDescription('The Zing MP3 API description')
    .setVersion('1.0')
    .addTag('Zing MP3')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('api', app, document);
  await app.listen(config.PORT);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
