import { Book } from './book.model'
import { authorEntity } from 'src/modules/database/entities/author.entity';

export class Author {
    
    id : number;
    last_name : string;
    first_name : string;
    picture : string;
    bio : string;
    books : Book[];

    constructor( author : authorEntity) {
        this.id = author.id;
        this.last_name = author.last_name;
        this.first_name = author.first_name;
        this.picture = author.picture;
        this.bio = author.bio;
    }

}