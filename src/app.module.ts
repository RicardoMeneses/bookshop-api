import { Module } from '@nestjs/common';
import { BookShopConfigModule } from './config/app/config.module';
import { BookShopDatabaseModule } from './config/database/database.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    BookShopDatabaseModule.forRoot(),
    BookShopConfigModule.forRoot(),
    BooksModule,
  ],
})
export class AppModule {}
