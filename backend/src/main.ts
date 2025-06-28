import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Enable CORS
  app.enableCors({
    origin: 'http://localhost:8080', // allow your frontend
    credentials: true, // if you're using cookies/auth headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
