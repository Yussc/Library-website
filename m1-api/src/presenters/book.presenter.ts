import { Book } from "src/models/book.model";
import { BookDetail } from "src/models/bookdetail.model";
import { BookSum } from "src/models/booksum.model";

export class bookPresenter {
    private book : Book;

    constructor(book : Book){
        this.book = book;
    }

    public BookSum() : BookSum {
        return new BookSum(this.book);
    }

    public BookDetail() : BookDetail {
        return new BookDetail(this.book);
    }
    
}