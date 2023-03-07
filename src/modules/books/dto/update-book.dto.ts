import { Transform } from 'class-transformer';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  author: string;

  @IsString()
  @IsOptional()
  imgUrl: string;

  @IsString()
  @IsOptional()
  synopsis: string;

  @IsString()
  @IsOptional()
  publisher: string;

  @IsString()
  @IsOptional()
  language: string;

  @IsString()
  @IsOptional()
  numberOfPages: string;

  @IsString()
  @IsOptional()
  publicationDate: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  isFavourite: boolean;
}
