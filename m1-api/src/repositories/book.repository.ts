import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BookEntity } from 'src/modules/database/entities/book.entity';

@Injectable()
export class BookRepository {

  constructor(private readonly dataSource: DataSource) {}

  private readonly bookRepository = this.dataSource.getRepository(BookEntity)

  findById(id: number):  Promise<BookEntity> | undefined {
    return this.bookRepository.findOne({where : {id} });
  }

  findByAuthorId(author_id: number):  Promise<BookEntity[]> | undefined {
    return this.bookRepository.find({where : {author_id} });
  }

  findAll() :  Promise<BookEntity[]> | undefined {
    return this.bookRepository.find();
  }

  create(bookEntity : BookEntity) : Promise<void> | undefined {
    this.bookRepository.insert(bookEntity);
    return;
  }

  delete(id : number) : Promise<void> | undefined {
    this.bookRepository.delete(id);
    return;
  }
}
