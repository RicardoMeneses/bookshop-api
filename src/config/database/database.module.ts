import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { BookShopConfig } from '../configuration';

@Module({})
export class BookShopDatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: BookShopDatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (
            config: ConfigService<BookShopConfig>,
          ): MongooseModuleFactoryOptions => ({
            uri: config.get('database.uri', { infer: true }),
            connectionFactory: (connection) => {
              if (connection.readyState === 1) {
                console.log('DB is connected');
              }
              connection.on('connected', () => {
                console.log('DB is connected');
              });
              connection.on('disconnected', () => {
                console.log('DB disconnected');
              });
              return connection;
            },
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
