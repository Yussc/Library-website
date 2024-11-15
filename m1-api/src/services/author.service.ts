import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../repositories/author.repository'
import { Author } from 'src/models/author.model';
import { authorEntity } from 'src/modules/database/entities/author.entity';
import { AuthorSum } from 'src/models/authorsum.model';
import { BookRepository } from 'src/repositories/book.repository';
import { Book } from 'src/models/book.model';
import { BookEntity } from 'src/modules/database/entities/book.entity';
import { Review } from 'src/models/review.model';
import { ReviewRepository } from 'src/repositories/review.repository';
import { createAuthorDTO } from 'src/DTOs/author.dto';
import { ModifyAuthorDTO } from 'src/DTOs/modify_author.dto';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly bookRepository: BookRepository,
    private readonly reviewRepository: ReviewRepository
  ) {}

  async findUserById(id: number) : Promise<Author> {
    let authorEntity : authorEntity = await this.authorRepository.findById(id)
    let booksEntities : BookEntity[] = await this.bookRepository.findByAuthorId(id);

    let books : Book[] = [];

    for(let bookEntity of booksEntities) {
      let reviews : Review[] = await this.reviewRepository.findByBookId(bookEntity.id)

      let book : Book = new Book(bookEntity ,new Author(authorEntity),reviews);
      books.push(book);
    }

    return new Author(authorEntity , books);
  }

  async findAll() : Promise<AuthorSum[]> {

    let authorsEntities : authorEntity[] = await this.authorRepository.findAll();
    let authors : AuthorSum[] = [] 

    for(let authorEntity of authorsEntities){
      let booksEntities : BookEntity[] = await this.bookRepository.findByAuthorId(authorEntity.id);

      let books : Book[] = [];

      for(let bookEntity of booksEntities) {
        let reviews : Review[] = await this.reviewRepository.findByBookId(bookEntity.id)

        let book : Book = new Book(bookEntity ,new Author(authorEntity),reviews);
        books.push(book);
      }
      authors.push(new AuthorSum(new Author(authorEntity,books)));
    }

    return authors;
  }

  async create(authorDTO : createAuthorDTO) : Promise<void> {
    let AuthorEntity = new authorEntity();
    AuthorEntity.bio = authorDTO.bio;
    AuthorEntity.first_name = authorDTO.first_name;
    AuthorEntity.last_name = authorDTO.last_name;
    AuthorEntity.picture = authorDTO.picture;
    this.authorRepository.create(AuthorEntity);
  }

  async modify(authorDTO : ModifyAuthorDTO) : Promise<void> {
    this.authorRepository.modify(authorDTO);
  }

  async delete(id: number) : Promise<void> {
    this.authorRepository.delete(id)
    this.bookRepository.deleteByAuthorId(id)
  }

}