import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum MovieRating {
  G = 'G',
  PG = 'PG',
  M = 'M',
  MA = 'MA',
  R = 'R',
}

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'int' })
  year_released!: number;

  @Column({ type: 'enum', enum: MovieRating })
  rating!: MovieRating;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}