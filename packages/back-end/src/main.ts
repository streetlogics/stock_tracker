import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

export const IS_DEV = process.env.NODE_ENV === 'development';
const origins = [
    'http://localhost:3000',
    'http://localhost:4001',
    'ws://localhost:4001'
  ];
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      methods: ['GET', 'HEAD', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
      origin: origins,
    },
  });
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.LISTEN_PORT || 4001);
}
bootstrap();
