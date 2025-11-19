import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";


export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    username: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    password: string


}