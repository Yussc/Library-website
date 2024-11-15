import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { BookModule } from './modules/book.module';
import { AuthorModule } from './modules/author.module';
import { ReviewModule } from './modules/review.module';

@Module({
  imports: [DatabaseModule,BookModule,AuthorModule,ReviewModule],
})
export class AppModule {}
