import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Evaluation {
    @PrimaryGeneratedColumn()
    id!: number | string;

    @Column()
    rating!: number;

    @Column()
    review!: string;

    @Column()
    productId!: number;

    @Column()
    status_Evaluation!: boolean;

    @ManyToOne(() => Product, { nullable: false })
    product!: Product; // Relación unidireccional a Product

}



