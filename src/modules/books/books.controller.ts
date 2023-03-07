import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookingService: BooksService) {}

  @Get()
  findAll() {
    return this.bookingService.findAllBooks();
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookingService.create(createBookDto);
  }
}
