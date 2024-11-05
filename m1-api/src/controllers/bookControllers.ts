import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: AppService) {}

  @Get('/books')
  public async getAllBooks() : Promise<string> {
    return this.bookService.getHello();
  }

  @Get('/books/:id')
  public async getBook(@Param('id') id: string) : Promise<string> {
    return this.bookService.getHello();
  }
}