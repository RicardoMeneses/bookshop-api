import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBooks() {
    return this.bookModel.aggregate([
      {
        $project: {
          title: 1,
          slug: 1,
          author: 1,
          imgUrl: 1,
          synopsis: 1,
          publisher: 1,
          language: 1,
          numberOfPages: 1,
          publicationDate: 1,
          isFavourite: 1,
        },
      },
    ]);
  }

  async create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }
}
