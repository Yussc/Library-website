import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../repositories/author.repository'
import { Author } from 'src/models/author.model';
import { authorEntity } from 'src/modules/database/entities/author.entity';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findUserById(id: number) : Promise<Author> {
    let author : authorEntity = await this.authorRepository.findById(id)
    return new Author(author);
  }

  async findAll() : Promise<Author[]> {

    let authorsEntities : authorEntity[] = await this.authorRepository.findAll();
    let authors : Author[] = [] 

    for(let authorEntity of authorsEntities){
      authors.push(new Author(authorEntity));
    }

    return authors;
  }


}