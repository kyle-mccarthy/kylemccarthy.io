import { FastifyAdapter, NestFactory } from '@nestjs/core';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { AppModule } from './app.module';

async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule, new FastifyAdapter());

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  await server.listen(3000);
}

bootstrap();
