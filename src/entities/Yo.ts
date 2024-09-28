import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Yo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

}