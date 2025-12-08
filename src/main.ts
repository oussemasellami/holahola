import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserFilterInterceptor } from './user-filter/user-filter.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalInterceptors(new UserFilterInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    forbidNonWhitelisted: true,
    //whitelist: true,
  }));

  await app.listen(3000);
}
bootstrap();
