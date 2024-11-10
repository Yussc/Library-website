import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository'
import { AuthorRepository } from 'src/repositories/author.repository';
import { Book } from 'src/models/book.model';
import { Author } from 'src/models/author.model';
import { BookEntity } from 'src/modules/database/entities/book.entity';
import { authorEntity } from 'src/modules/database/entities/author.entity';
import { reviewEntity } from 'src/modules/database/entities/review.entity';
import { ReviewRepository } from 'src/repositories/review.repository';
import { Review } from 'src/models/review.model';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository : AuthorRepository,
    private readonly reviewRepository : ReviewRepository     

  ) {}

  async findUserById(id: number) {
    let book : BookEntity = await this.bookRepository.findById(id);
    let author : authorEntity = await this.authorRepository.findById(book.author_id);
    let reviews : Review[] = await this.reviewRepository.findByBookId(id)



    return new Book(book ,new Author(author),reviews);
    
  }

  async findAll() {
    let booksEntities : BookEntity[] = await this.bookRepository.findAll();
    let books : Book[] = [];

    for(let bookEntity of booksEntities) {
      let book : BookEntity = await this.bookRepository.findById(bookEntity.id);
      let author : authorEntity = await this.authorRepository.findById(book.author_id);
      let reviews : Review[] = await this.reviewRepository.findByBookId(bookEntity.id)

      books.push(new Book(book ,new Author(author),reviews));
    }

    return books;

  }


}