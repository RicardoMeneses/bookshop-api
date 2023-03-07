import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BookShopConfig } from './config/app/configuration';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = app.get<ConfigService<BookShopConfig>>(ConfigService);
  const port = configService.get('port');
  await app.listen(port);

  logger.log(`Application listening on port :${port}`);
}
bootstrap();
