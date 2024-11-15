import { Module } from '@nestjs/common';
import { BookService } from 'src/services/book.service';
import { BookRepository } from 'src/repositories/book.repository'; 
import { AuthorRepository } from 'src/repositories/author.repository';
import { ReviewRepository } from 'src/repositories/review.repository';
import { ReviewController } from 'src/controllers/review.controller';
import { ReviewService } from 'src/services/review.service';

@Module({

  controllers: [
    ReviewController, 
  ],
  providers: [
    ReviewRepository,
    ReviewService, 
  ],
})
export class ReviewModule {}