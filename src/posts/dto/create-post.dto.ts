import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePostDto {

    @ApiProperty({
        description:'The title of a Post',
        minLength:2,
        maxLength:20
    })

    @IsString()
    name:string

    @ApiPropertyOptional()

    @IsString()
    content:string

    @ApiProperty()

    @IsNotEmpty()
    @IsNumber()
    release_date:number
}