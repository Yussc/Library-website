import { Author } from './author.model'
import { Book } from './book.model';

export class BookSum {
    id : number;
    title : string;
    mean : number;
    yearPublished : number;
    author : Author;


    constructor(book : Book){
        this.id = book.id;
        this.title = book.title;
        this.yearPublished = book.yearPublished;
        this.author = book.author;
        this.mean = 0;

        for(let review of book.reviews){
            this.mean += review.review;
        }

        this.mean /= book.reviews.length;
    }
}