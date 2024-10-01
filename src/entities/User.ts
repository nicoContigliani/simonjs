import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { models } from '../routes/treeRoutes';

@Entity()
export class User {
 
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  password!: string;

  @Column()
  age!: number;

}