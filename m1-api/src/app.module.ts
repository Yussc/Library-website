import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { BookModule } from './modules/book.module';
import { AuthorModule } from './modules/author.module';

@Module({
  imports: [DatabaseModule,BookModule,AuthorModule],
})
export class AppModule {}
