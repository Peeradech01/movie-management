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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 200 })
  title!: string;

  @Column({ name: 'year_released', type: 'int' })
  yearReleased!: number;

  @Column({ type: 'enum', enum: MovieRating })
  rating!: MovieRating;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}