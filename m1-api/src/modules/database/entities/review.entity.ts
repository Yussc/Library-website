import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class reviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'review', type: 'int' })
  review: number;

  @Column({ name: 'book_id', type: 'int' })
  book_id: number;


}