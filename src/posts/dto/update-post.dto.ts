import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdatePostDto{

    @ApiProperty()
    
    @IsNotEmpty()
    @IsString()
    name:string
    
    @ApiProperty()
    
    @IsNotEmpty()
    @IsString()
    content:string
    
    @ApiProperty()

    @IsNotEmpty()
    @IsNumber()
    release_date: number
}