import { MovieRating } from "../entities/movie.entity";
import { IsEnum, IsInt, IsNotEmpty, MinLength } from "class-validator";

export class CreateMovieDto {

  @IsNotEmpty()
  @MinLength(1)
  title!: string;

  @IsNotEmpty()
  @IsInt()
  yearReleased!: number;

  @IsNotEmpty()
  @IsEnum(MovieRating)
  rating!: MovieRating;
}
