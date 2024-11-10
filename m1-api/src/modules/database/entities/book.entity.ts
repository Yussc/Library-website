import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'price', type: 'real' })
  price: number;

  @Column({ name: 'reviewsCount', type: 'int' })
  reviewsCount: number;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

  @Column({ name: 'author_id', type: 'int' })
  author_id: number;

}