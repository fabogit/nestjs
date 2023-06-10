import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'session-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
  console.log(`✅ Application is running on: ${await app.getUrl()}`);
}
bootstrap();
