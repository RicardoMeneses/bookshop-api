import { Controller, Get } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private bookingService: BooksService) {}

  @Get()
  findAll() {
    return this.bookingService.findAllBooks();
  }
}
