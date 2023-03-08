import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FavoritesBooksDto } from './dto/get-favourites.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookingService: BooksService) {}

  // Obtener todos los libros o solo los marcados como favoritos
  /**
   * findAll(): Método GET
   * @param favoritesdto ?favorites=true
   * @returns Lista de libros o solo los marcados como facoritos
   */
  @Get()
  findAll(@Query('favorites') favoritesdto: FavoritesBooksDto) {
    return this.bookingService.findAllBooks(favoritesdto);
  }

  // Buscar un libro por su slug
  /**
   * findOneBook(): Método GET
   * @param slug
   * @returns El libro
   */
  @Get('/:slug')
  findOneBook(@Param('slug') slug: string) {
    return this.bookingService.findOneBook(slug);
  }

  // Crear libro
  /**
   * create(): Método GET
   * @param createBookDto
   * @returns EL libro creado
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookingService.create(createBookDto);
  }

  // Actualizar libro mediante su slug
  /**
   *
   * @param slug
   * @param updateBookDto Información a actualizar
   * @returns El libro actualizado
   */
  @Put('/:slug')
  update(@Param('slug') slug: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookingService.update(updateBookDto, slug);
  }

  // Eliminar libro por su id
  /**
   *
   * @param id
   * @returns El valor si elimino el libro
   */
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
