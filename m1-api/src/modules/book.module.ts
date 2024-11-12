import { Module } from '@nestjs/common';
import { BookService } from 'src/services/book.service';
import { BookController } from 'src/controllers/book.controller'; 
import { BookRepository } from 'src/repositories/book.repository'; 
import { AuthorRepository } from 'src/repositories/author.repository';
import { ReviewRepository } from 'src/repositories/review.repository';

@Module({

  controllers: [
    BookController, 
  ],
  providers: [
    AuthorRepository,
    ReviewRepository,
    BookService, 
    BookRepository,
  ],
})
export class BookModule {}