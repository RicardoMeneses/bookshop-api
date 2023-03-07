import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  _id: Types.ObjectId | string;

  @Prop({ unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  imgUrl: string;

  @Prop({ required: true })
  synopsis: string;

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  numberOfPages: string;

  @Prop({ required: true })
  publicationDate: string;

  @Prop({ required: true })
  isFavorite: boolean;
}

const schema = SchemaFactory.createForClass(Book);

export const BookSchema = schema;
