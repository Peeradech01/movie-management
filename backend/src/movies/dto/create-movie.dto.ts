import { MovieRating } from "../entities/movie.entity";

export class CreateMovieDto {
  title!: string;
  year_released!: number;
  rating!: MovieRating;
}
