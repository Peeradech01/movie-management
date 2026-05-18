export type UserRole = 'MANAGER' | 'TEAMLEADER' | 'FLOORSTAFF';

export type MovieRating = 'G' | 'PG' | 'M' | 'MA' | 'R';

export interface User {
  userId: number;
  username: string;
  role: UserRole;
}

export interface Movie {
  id: number;
  title: string;
  yearReleased: number;
  rating: MovieRating;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
}
