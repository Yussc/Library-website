import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AppService) {}

  @Get('/authors')
  public async getAllauthors() : Promise<string> {
    return this.authorService.getHello();
  }

  @Get('/authors/:id')
  public async getauthor(@Param('id') id: string) : Promise<string> {
    return this.authorService.getHello();
  }
}