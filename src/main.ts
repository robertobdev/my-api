import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
