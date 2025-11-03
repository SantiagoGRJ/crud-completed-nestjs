import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdatePostDto{
    
    @IsNotEmpty()
    @IsString()
    name:string
    
    @IsNotEmpty()
    @IsString()
    content:string

    @IsNotEmpty()
    @IsNumber()
    release_date: number
}