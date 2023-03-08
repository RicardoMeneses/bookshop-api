import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { FavoritesBooksDto } from './dto/get-favourites.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import slugify from 'slugify';
import { ErrorCodes } from 'src/common/errors';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBooks(favorites: FavoritesBooksDto) {
    if (favorites) {
      return this.bookModel.find({ isFavorite: true });
    }
    return this.bookModel.find();
  }

  async findOneBook(slug: string) {
    return this.bookModel.findOne({ slug });
  }

  async create(createBookDto: CreateBookDto) {
    const slug = slugify(createBookDto.title, { lower: true });
    const book = await this.bookModel.findOne({ slug });
    if (book) {
      throw new ConflictException(ErrorCodes.BOOK_ALREADY_EXIST);
    }

    const dataCreate = { ...createBookDto, slug };
    return this.bookModel.create(dataCreate);
  }

  async update(updateBookDto: UpdateBookDto, slug: string) {
    let newSlug;
    if (updateBookDto.title) {
      newSlug = slugify(updateBookDto.title, { lower: true });
      if (newSlug !== slug) {
        const book = await this.bookModel.findOne({ slug: newSlug });
        if (book) {
          throw new ConflictException(ErrorCodes.BOOK_ALREADY_EXIST);
        }
      }
    } else {
      newSlug = slug;
    }
    return this.bookModel.findOneAndUpdate(
      { slug },
      { $set: { ...updateBookDto, slug: newSlug } },
      { new: true },
    );
  }

  async delete(id: string) {
    return this.bookModel.deleteOne({ _id: id });
  }
}
