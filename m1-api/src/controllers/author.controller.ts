import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { Author } from 'src/models/author.model';
import { AuthorService } from 'src/services/author.service';
import { AuthorSum } from 'src/models/authorsum.model';
import { createAuthorDTO } from 'src/DTOs/author.dto';
import { ModifyAuthorDTO } from 'src/DTOs/modify_author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get('/')
  public async getAllauthors() : Promise<AuthorSum[]> {
    return this.authorService.findAll();
  }

  @Get('/:id')
  public async getauthor(@Param('id') id: number) : Promise<Author> {
    return this.authorService.findUserById(id);
  }

  @Post('/create')
  public async createAuthor(@Body() input: createAuthorDTO) : Promise<string> {
    await this.authorService.create(input);
    return 'ok';
  }

  @Post('/modify')
  public async modifyAuthor(@Body() input: ModifyAuthorDTO) : Promise<string> {
    await this.authorService.modify(input);
    return 'ok';
  }
}