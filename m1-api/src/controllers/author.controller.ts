import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';
import { Author } from 'src/models/author.model';
import { AuthorService } from 'src/services/author.service';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('/')
  public async getAllauthors() : Promise<Author[]> {
    return this.authorService.findAll();
  }

  @Get('/:id')
  public async getauthor(@Param('id') id: number) : Promise<Author> {
    return this.authorService.findUserById(id);
  }
}