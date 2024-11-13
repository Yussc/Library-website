import { Author } from './author.model';

export class AuthorSum {
    
    id : number;
    last_name : string;
    first_name : string;
    picture : string;
    number_books : any;

    constructor( author : Author) {
        this.id = author.id;
        this.last_name = author.last_name;
        this.first_name = author.first_name;
        this.picture = author.picture;
        this.number_books = author.books.length;
    }

}