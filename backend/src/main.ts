import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
    // Enable CORS
  app.enableCors({
    origin:['http://localhost:8080', "https://xpenso-lbvi.vercel.app"], // allow your frontend
    credentials: true, // if you're using cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
