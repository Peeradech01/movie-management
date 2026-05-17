import { types, flow } from 'mobx-state-tree';
import { moviesApi } from '../api/movies.api';
import type { MovieRating } from '../types';

const MovieModel = types.model('Movie', {
  id: types.number,
  title: types.string,
  yearReleased: types.number,
  rating: types.enumeration<MovieRating>('MovieRating', ['G', 'PG', 'M', 'MA', 'R']),
  createdAt: types.string,
  updatedAt: types.string,
});

const MovieStore = types
  .model('MovieStore', {
    movies: types.array(MovieModel),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get totalMovies() {
      return self.movies.length;
    },
  }))
  .actions((self) => ({
    fetchMovies: flow(function* () {
      self.isLoading = true;
      self.error = null;
      try {
        const movies = yield moviesApi.getAll();
        self.movies = movies;
      } catch {
        self.error = 'Failed to fetch movies';
      } finally {
        self.isLoading = false;
      }
    }),

    createMovie: flow(function* (data: { title: string; yearReleased: number; rating: MovieRating }) {
      self.isLoading = true;
      self.error = null;
      try {
        const movie = yield moviesApi.create(data);
        self.movies.push(movie);
      } catch {
        self.error = 'Failed to create movie';
      } finally {
        self.isLoading = false;
      }
    }),

    updateMovie: flow(function* (id: number, data: Partial<{ title: string; yearReleased: number; rating: MovieRating }>) {
      self.isLoading = true;
      self.error = null;
      try {
        const updated = yield moviesApi.update(id, data);
        const index = self.movies.findIndex((m) => m.id === id);
        if (index !== -1) self.movies[index] = updated;
      } catch {
        self.error = 'Failed to update movie';
      } finally {
        self.isLoading = false;
      }
    }),

    deleteMovie: flow(function* (id: number) {
      self.isLoading = true;
      self.error = null;
      try {
        yield moviesApi.remove(id);
        self.movies = self.movies.filter((m) => m.id !== id) as typeof self.movies;
      } catch {
        self.error = 'Failed to delete movie';
      } finally {
        self.isLoading = false;
      }
    }),
  }));

export default MovieStore;