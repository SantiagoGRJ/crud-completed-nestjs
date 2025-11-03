import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePostDto {

    @IsString()
    name:string

    @IsString()
    content:string

    @IsNotEmpty()
    @IsNumber()
    release_date:number
}