import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new CustomValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('My Api')
    .setDescription(
      'My api is a boilplate to get code done faster! Includes: Login, Authorization and ACL',
    )
    .setVersion('1.0')
    .addTag('myapi')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
