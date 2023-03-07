import { Transform } from 'class-transformer';
import { IsBoolean } from 'class-validator';

export class FavoritesBooksDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  favorites: boolean;
}
