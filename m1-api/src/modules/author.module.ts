import { Module } from '@nestjs/common';
import { AuthorService } from 'src/services/author.service';
import { AuthorController } from 'src/controllers/author.controller'; 
import { AuthorRepository } from 'src/repositories/author.repository'; 

@Module({

  controllers: [
    AuthorController, 
  ],
  providers: [
    AuthorService, 
    AuthorRepository,
  ],
})
export class AuthorModule {}