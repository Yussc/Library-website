import { Injectable } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository'
import { AuthorRepository } from 'src/repositories/author.repository';
import { Book } from 'src/models/book.model';
import { Author } from 'src/models/author.model';
import { BookEntity } from 'src/modules/database/entities/book.entity';
import { authorEntity } from 'src/modules/database/entities/author.entity';
import { ReviewRepository } from 'src/repositories/review.repository';
import { Review } from 'src/models/review.model';
import { bookPresenter } from 'src/presenters/book.presenter';
import { BookDetail } from 'src/models/bookdetail.model';
import { BookSum } from 'src/models/booksum.model';
import { CreateBookDTO } from 'src/DTOs/book.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository : AuthorRepository,
    private readonly reviewRepository : ReviewRepository     

  ) {}

  async findUserById(id: number) : Promise<BookDetail> {
    let bookEntity : BookEntity = await this.bookRepository.findById(id);
    let author : authorEntity = await this.authorRepository.findById(bookEntity.author_id);
    let reviews : Review[] = await this.reviewRepository.findByBookId(id)

    let book : Book = new Book(bookEntity ,new Author(author),reviews);
    let BookPresenter : bookPresenter = new bookPresenter(book);


    return BookPresenter.BookDetail();
    
  }

  async findAll() : Promise<BookSum[]> {
    let booksEntities : BookEntity[] = await this.bookRepository.findAll();
    let books : BookSum[] = [];

    for(let bookEntity of booksEntities) {
      let author : authorEntity = await this.authorRepository.findById(bookEntity.author_id);
      let reviews : Review[] = await this.reviewRepository.findByBookId(bookEntity.id)

      let book : Book = new Book(bookEntity ,new Author(author),reviews);
      let BookPresenter : bookPresenter = new bookPresenter(book);

      books.push(BookPresenter.BookSum());
    }

    return books;

  }

  async create(bookDTO : CreateBookDTO) : Promise<void> {
    let bookEntity = new BookEntity();
    bookEntity.author_id = bookDTO.authorId;
    bookEntity.title = bookDTO.title;
    bookEntity.price = bookDTO.price;
    bookEntity.yearPublished = bookDTO.yearPublished;
    bookEntity.reviewsCount = 0;
    this.bookRepository.create(bookEntity);
  }


}