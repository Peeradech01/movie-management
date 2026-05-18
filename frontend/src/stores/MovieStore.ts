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
    total: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
    limit: types.optional(types.number, 10),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get totalPages() {
      return Math.ceil(self.total / self.limit);
    },
    get totalMovies() {
      return self.total;
    },
  }))
  .actions((self) => ({
    fetchMovies: flow(function* (page = 1) {
      self.isLoading = true;
      self.error = null;
      self.currentPage = page;
      try {
        const result = yield moviesApi.getAll(page, self.limit);
        self.movies = result.data;
        self.total = result.total;
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
        yield moviesApi.create(data);
        yield (self as any).fetchMovies(1);
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
        yield moviesApi.update(id, data);
        yield (self as any).fetchMovies(self.currentPage);
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
        const newPage = self.movies.length === 1 && self.currentPage > 1
          ? self.currentPage - 1
          : self.currentPage;
        yield (self as any).fetchMovies(newPage);
      } catch {
        self.error = 'Failed to delete movie';
      } finally {
        self.isLoading = false;
      }
    }),
  }));

export default MovieStore;
