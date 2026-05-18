import { DataSource } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Movie } from '../movies/entities/movie.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user.entity';
import { MovieRating } from '../movies/entities/movie.entity';

export async function seedDatabase(dataSource: DataSource): Promise<void> {
  const userRepo = dataSource.getRepository(User);
  const movieRepo = dataSource.getRepository(Movie);

  // user
  const existingUsers = await userRepo.count();
  if (existingUsers === 0) {
    const users = [
      {
        username: 'manager',
        password: await bcrypt.hash('123456', 10),
        firstName: 'Alex',
        lastName: 'Carter',
        role: UserRole.MANAGER,
      },

      {
        username: 'teamlead',
        password: await bcrypt.hash('123456', 10),
        firstName: 'Mia',
        lastName: 'Thompson',
        role: UserRole.TEAMLEADER,
      },

      {
        username: 'staff',
        password: await bcrypt.hash('123456', 10),
        firstName: 'Noah',
        lastName: 'Walker',
        role: UserRole.FLOORSTAFF,
      },
    ];
    await userRepo.save(userRepo.create(users));
    console.log('Users seeded');
  }

  // movie
  const existingMovies = await movieRepo.count();
  if (existingMovies === 0) {
    const movies = [
      {
        title: 'The Shawshank Redemption',
        yearReleased: 1994,
        rating: MovieRating.M
      },
      {
        title: 'The Godfather',
        yearReleased: 1972,
        rating: MovieRating.MA
      },
      {
        title: 'The Dark Knight',
        yearReleased: 2008,
        rating: MovieRating.M
      },
      {
        title: 'Pulp Fiction',
        yearReleased: 1994,
        rating: MovieRating.R
      },
      {
        title: 'Forrest Gump',
        yearReleased: 1994,
        rating: MovieRating.PG
      },
      {
        title: 'Inception',
        yearReleased: 2010,
        rating: MovieRating.M
      },
      {
        title: 'The Lion King',
        yearReleased: 1994,
        rating: MovieRating.G
      },
      {
        title: 'Interstellar',
        yearReleased: 2014,
        rating: MovieRating.M
      }
    ];

    await movieRepo.save(movieRepo.create(movies));
    console.log('Movies seeded');
  }
}
