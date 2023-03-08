import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { FavoritesBooksDto } from './dto/get-favourites.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import slugify from 'slugify';
import { ErrorCodes } from '../../common/errors';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  /**
   *
   * @param favorites
   * @returns Lista de libros
   */
  async findAllBooks(favorites: FavoritesBooksDto) {
    // Si hay query farorites retornar los libros marcados como favoritos
    if (favorites) {
      return this.bookModel.find({ isFavorite: true });
    }
    // Si no hay query farorites retornar todos los libros
    return this.bookModel.find();
  }

  // Buscar solo uno por slug
  /**
   *
   * @param slug
   * @returns Un libro
   */
  async findOneBook(slug: string) {
    return this.bookModel.findOne({ slug });
  }

  // Crear libro
  /**
   *
   * @param createBookDto
   * @returns El libro creado
   */
  async create(createBookDto: CreateBookDto) {
    const slug = slugify(createBookDto.title, { lower: true });
    const book = await this.bookModel.findOne({ slug });

    // Si ya existe un libro con el nombre proporcionado retorna un Conflicto
    if (book) {
      throw new ConflictException(ErrorCodes.BOOK_ALREADY_EXIST);
    }

    // Sino retorna crea y retorna el libro
    const dataCreate = { ...createBookDto, slug };
    return this.bookModel.create(dataCreate);
  }

  // Actualizar Libro
  /**
   *
   * @param updateBookDto
   * @param slug
   * @returns El libro actualizado
   */
  async update(updateBookDto: UpdateBookDto, slug: string) {
    let newSlug;
    // Si se modifica el título busca si ya existe uno con ese
    if (updateBookDto.title) {
      newSlug = slugify(updateBookDto.title, { lower: true });
      if (newSlug !== slug) {
        const book = await this.bookModel.findOne({ slug: newSlug });
        // Si existe un libro con el mismo título retorna el conflicto
        if (book) {
          throw new ConflictException(ErrorCodes.BOOK_ALREADY_EXIST);
        }
      }
    } else {
      // Sino existe se le asigna el nuevo slug
      newSlug = slug;
    }
    return this.bookModel.findOneAndUpdate(
      { slug },
      { $set: { ...updateBookDto, slug: newSlug } },
      { new: true },
    );
  }

  /**
   *
   * @param id
   * @returns Si el libro fue eliminado
   */
  async delete(id: string) {
    return this.bookModel.deleteOne({ _id: id });
  }
}
