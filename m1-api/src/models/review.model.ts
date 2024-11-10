import { reviewEntity } from 'src/modules/database/entities/review.entity';
import { Book } from './book.model'
import { authorEntity } from 'src/modules/database/entities/author.entity';

export class Review {
    
    id : number;
    review : number;
    book_id : number;

    constructor(review : reviewEntity) {
        this.id = review.id;
        this.review = review.review;
        this.book_id = review.book_id;
    }

}