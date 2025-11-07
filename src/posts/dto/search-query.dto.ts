
import { Transform } from "class-transformer";
import { IsInt,  IsOptional, Max, Min } from "class-validator";

export class SearchQueryDto {

    @IsOptional()
    @Transform(({value}) => value ? parseInt(value) : 1 )
    @IsInt()
    @Min(1)
    @Max(100)
    page: number 

    @IsOptional()
    @Transform(({value}) => value ? parseInt(value) : 10)
    @IsInt()
    @Min(2)
    @Max(100)
    pageSize: number

}