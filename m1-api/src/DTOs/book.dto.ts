import { IsNumber, IsString } from "class-validator";

export class CreateBookDTO {

    @IsString()
    title : string;

    @IsNumber()
    price : number;

    @IsNumber()
    yearPublished : number;

    @IsNumber()
    authorId : number;

}