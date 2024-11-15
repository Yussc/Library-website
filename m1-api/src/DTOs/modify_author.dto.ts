import { IsNumber, IsOptional, IsString } from "class-validator";

export class ModifyAuthorDTO {

    @IsNumber()
    id : number;

    @IsOptional()
    @IsString()
    last_name : string | undefined;

    @IsOptional()
    @IsString()
    first_name : string | undefined;

    @IsOptional()
    @IsString()
    picture : string | undefined;

    @IsOptional()
    @IsString()
    bio : string| undefined;

}