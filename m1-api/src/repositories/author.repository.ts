import { Injectable } from '@nestjs/common';
import { Author } from '../models/author';
import { DataSource } from 'typeorm';
import { authorEntity } from 'src/modules/database/entities/author.entity';

@Injectable()
export class authorRepository {

  constructor(private readonly dataSource: DataSource) {}

  private readonly authorRepository = this.dataSource.getRepository(authorEntity)

  findById(id: number):  Promise<authorEntity> | undefined {
    return this.authorRepository.findOne({where : {id} });
  }

  findAll() :  Promise<authorEntity[]> | undefined {
    return this.authorRepository.find();
  }
}
