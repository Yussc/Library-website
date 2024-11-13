import { IsNumber, IsString } from "class-validator";

export class createAuthorDTO {

    @IsString()
    last_name : string;

    @IsString()
    first_name : string;

    @IsString()
    picture : string;

    @IsString()
    bio : string;

}