import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class BookEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'title', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

}
