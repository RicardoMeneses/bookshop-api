import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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

  async findOneBook(slug: string) {
    return this.bookModel.findOne({ slug });
  }

  async create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  async update(updateBookDto: UpdateBookDto, slug: string) {
    return this.bookModel.findOneAndUpdate(
      { slug },
      { $set: { ...updateBookDto } },
      { new: true },
    );
  }

  async delete(id: string) {
    return this.bookModel.deleteOne({ _id: id });
  }
}
