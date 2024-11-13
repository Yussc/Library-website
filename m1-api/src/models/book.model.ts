import {Author} from './author.model'
import { BookEntity } from 'src/modules/database/entities/book.entity';
import { Review } from './review.model';

export class Book {
    id : number;
    title : string;
    price : number;
    reviews : Review[];
    yearPublished : number;
    author : Author;


    constructor(book : BookEntity ,author : Author, reviews : Review[]){
        this.id = book.id;
        this.title = book.title;
        this.price = book.price;
        this.reviews = reviews;
        this.yearPublished = book.yearPublished;
        this.author = author;
    }
}