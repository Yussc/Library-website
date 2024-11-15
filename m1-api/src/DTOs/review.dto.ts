import { IsNumber, IsString } from "class-validator";

export class CreateReviewDTO {

    @IsString()
    review : string;

    @IsNumber()
    note : number;

    @IsNumber()
    book_id: number;

}