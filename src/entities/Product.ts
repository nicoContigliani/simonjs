import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { models } from '../routes/treeRoutes';

@Entity()
export class Product {
 
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  stock!: number;

}