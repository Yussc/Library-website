import { Module } from '@nestjs/common';
import { AuthorService } from 'src/services/author.service';
import { AuthorController } from 'src/controllers/author.controller'; 
import { AuthorRepository } from 'src/repositories/author.repository'; 
import { BookRepository } from 'src/repositories/book.repository';
import { ReviewRepository } from 'src/repositories/review.repository';

@Module({

  controllers: [
    AuthorController, 
  ],
  providers: [
    AuthorService, 
    BookRepository,
    ReviewRepository,
    AuthorRepository,
  ],
})
export class AuthorModule {}