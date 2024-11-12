import { Controller, Get, Param } from '@nestjs/common';
import { BookEntity } from 'src/modules/database/entities/book.entity';
import { BookService } from 'src/services/book.service';
import {Book} from 'src/models/book.model'
import { BookDetail } from 'src/models/bookdetail.model';
import { BookSum } from 'src/models/booksum.model';
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('/')
  public async getAllBooks() : Promise<BookSum[]> {
    return this.bookService.findAll();
  }

  @Get(':id')
  public async getBook(@Param('id') id: number) : Promise<BookDetail> {
    return this.bookService.findUserById(id);
  }
}