import { MovieRating } from '../entities/movie.entity';
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title!: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear() + 5)
  yearReleased!: number;

  @IsNotEmpty()
  @IsEnum(MovieRating, {
    message: 'rating must be one of: G, PG, M, MA, R',
  })
  rating!: MovieRating;
}
