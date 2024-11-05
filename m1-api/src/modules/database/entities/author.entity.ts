import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('authors')
export class authorEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  title: string;

  @Column({ name: 'year_published', type: 'int' })
  yearPublished: number;

}