import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsMiddleware } from './common/middlewares/cors.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' });
  app.use(new CorsMiddleware().use);
  await app.listen(3000);
}
bootstrap();
