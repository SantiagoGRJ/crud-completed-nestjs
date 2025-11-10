import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength } from "class-validator"

export class CreatePostDto {

    @ApiProperty({
        description:'The title of a Post',
        minLength:2,
        maxLength:20
    })

    @IsNotEmpty()
    @IsString()
    name:string

    @ApiProperty()

    @IsNotEmpty()
    @IsString()
    @MaxLength(150)
    content:string

    @ApiProperty()

    @IsNotEmpty()
    @IsString()
    release_date:string

    @IsOptional()
    path_image:string
}