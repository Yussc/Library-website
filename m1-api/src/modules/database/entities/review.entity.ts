import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reviews')
export class reviewEntity extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'review', type: 'varchar' })
  review: string;

  @Column({ name: 'note', type: 'int' })
  note: number;

  @Column({ name: 'book_id', type: 'int' })
  book_id: number;


}