import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

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
    @IsString()
    release_date: string

    @IsOptional()
    path_image:string
}