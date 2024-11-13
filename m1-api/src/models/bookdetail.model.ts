import { Book } from './book.model';
import { Review } from './review.model';

export class BookDetail {
    id : number;
    title : string;
    yearPublished : number;
    authorName : string;
    reviews : Review[];


    constructor(book : Book){
        this.id = book.id;
        this.title = book.title;
        this.yearPublished = book.yearPublished;
        this.authorName = `${book.author.first_name} ${book.author.last_name}`;
        this.reviews = book.reviews;
    }
}