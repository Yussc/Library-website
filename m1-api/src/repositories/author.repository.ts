import { Injectable } from '@nestjs/common';
import { Author } from '../models/author.model';
import { CustomRepositoryCannotInheritRepositoryError, DataSource } from 'typeorm';
import { authorEntity } from 'src/modules/database/entities/author.entity';
import { ModifyAuthorDTO } from 'src/DTOs/modify_author.dto';

@Injectable()
export class AuthorRepository {

  constructor(private readonly dataSource: DataSource) {}

  private readonly authorRepository = this.dataSource.getRepository(authorEntity)

  findById(id: number):  Promise<authorEntity> | undefined {
    return this.authorRepository.findOne({where : {id} });
  }

  findAll() :  Promise<authorEntity[]> | undefined {
    return this.authorRepository.find();
  }

  create(AuthorEntity : authorEntity) : Promise<void> | undefined {
    this.authorRepository.insert(AuthorEntity);
    return;
  }

  modify(AuthorEntity : ModifyAuthorDTO) : Promise<void> | undefined {

   
    this.authorRepository.update(AuthorEntity.id,AuthorEntity)
    return;

  }

  delete(id : number) : Promise<void> | undefined {
    this.authorRepository.delete(id);
    return;
  }
}
