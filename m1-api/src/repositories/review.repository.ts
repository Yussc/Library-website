import { Injectable } from '@nestjs/common';
import { Author } from '../models/author.model';
import { CustomRepositoryCannotInheritRepositoryError, DataSource } from 'typeorm';
import { reviewEntity } from 'src/modules/database/entities/review.entity';
import { Review } from 'src/models/review.model';

@Injectable()
export class ReviewRepository {

  constructor(private readonly dataSource: DataSource) {}

  private readonly reviewRepository = this.dataSource.getRepository(reviewEntity)

  async findByBookId(book_id: number):  Promise<Review[]> | undefined {
    
    let reviewEntities : reviewEntity[] = await this.reviewRepository.find({where : {book_id} });
    let reviews : Review[];

    for(let reviewEntity of reviewEntities) {
        reviews.push(new Review(reviewEntity))
    }

    return reviews;
  }

}
