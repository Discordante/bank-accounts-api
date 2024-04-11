import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('APP_PREFIX', '');
  const docsPath = configService.get<string>('SWAGGER_PATH');

  app.use(helmet());
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app, { globalPrefix, docsPath });

  const port = configService.get('APP_PORT', '3000');

  await app.listen(port);

  new Logger('Init').log(
    `- 🚀 Application: ${await app.getUrl()}${globalPrefix}`,
  );
  new Logger('Init').log(
    `- 📝 Documentation: ${await app.getUrl()}${globalPrefix}${docsPath}`,
  );
}
bootstrap();
