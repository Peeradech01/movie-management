import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>,
  ) { }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    try {
      return await this.moviesRepository.save(movie);
    } catch (error) {
      throw new BadRequestException('Failed to create movie');
    }
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find({
      order: { id: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });
    if (!movie) {
      throw new NotFoundException(`Movie ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    Object.assign(movie, updateMovieDto);
    return this.moviesRepository.save(movie);

  }

  async remove(id: number): Promise<{ message: string }> {
    const movie = await this.findOne(id);
    await this.moviesRepository.remove(movie);
    return { message: 'Movie deleted successfully' };
  }
}
