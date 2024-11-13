import { Author } from "src/models/author.model";
import { AuthorSum } from "src/models/authorsum.model";

export class authorPresenter {
    private author : Author;

    constructor(author : Author){
        this.author = author;
    }

    public AuthorSum() : AuthorSum {
        return new AuthorSum(this.author);
    }

    public AuthorDetail() : Author {
        return this.author;
    }
    
}