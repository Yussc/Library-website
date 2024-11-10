import { Module } from '@nestjs/common';
import { BookService } from 'src/services/book.service';
import { BookController } from 'src/controllers/book.controller'; 
import { BookRepository } from 'src/repositories/book.repository'; 

@Module({

  controllers: [
    BookController, 
  ],
  providers: [
    BookService, 
    BookRepository,
  ],
})
export class BookModule {}