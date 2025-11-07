import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
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
    @Transform(() => Number)
    @IsNumber()
    release_date: number
}