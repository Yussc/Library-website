import { Injectable } from '@nestjs/common';
import { BookEntity } from 'src/modules/database/entities/book.entity';
import { ReviewRepository } from 'src/repositories/review.repository';
import { CreateReviewDTO } from 'src/DTOs/review.dto';
import { reviewEntity } from 'src/modules/database/entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository : ReviewRepository     

  ) {}


  async create(reviewDTO : CreateReviewDTO) : Promise<void> {
    let ReviewEntity = new reviewEntity();
    ReviewEntity.note = reviewDTO.note;
    ReviewEntity.book_id = reviewDTO.book_id;
    ReviewEntity.review = reviewDTO.review;

    this.reviewRepository.create(ReviewEntity);
  }


}