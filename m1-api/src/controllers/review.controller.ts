import { Controller,Post, Body } from '@nestjs/common';
import { ReviewService } from 'src/services/review.service';
import { CreateReviewDTO } from 'src/DTOs/review.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}


  @Post('/create')
  public async createReview(@Body() input: CreateReviewDTO) : Promise<string> {
    await this.reviewService.create(input);
    return 'ok';
  }
}