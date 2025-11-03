import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostDto {

    @IsString()
    title:string

    @IsString()
    content:string

    @IsNotEmpty()
    release_date:number
}