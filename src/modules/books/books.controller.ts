import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookingService: BooksService) {}

  // Find All book with pagination
  @Get()
  findAll() {
    return this.bookingService.findAllBooks();
  }

  // Get one book by slug
  @Get('/:slug')
  findOneBook(@Param('slug') slug: string) {
    return this.bookingService.findOneBook(slug);
  }

  // Create Book
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookingService.create(createBookDto);
  }

  // Update Book by slug
  @Put('/:slug')
  update(@Param('slug') slug: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookingService.update(updateBookDto, slug);
  }

  // Delete Book by id
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
