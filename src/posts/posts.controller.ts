import { Body, Controller, Delete, Get, Param,  ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ValidateorderPipe } from "./pipes/validateorder/validateorder.pipe";
import { SearchQueryDto } from "./dto/search-query.dto";


@Controller('posts')
@ApiTags('posts')
export class PostsController {

    constructor(private postsService:PostsService){}

    @Get()    
    async getAllPosts(
        @Query('name') name:string,
        @Query('content') content:string,
        @Query('order', new ValidateorderPipe()) order:boolean,
        @Query() {page,pageSize}:SearchQueryDto,
    ){
        return await this.postsService.getAllPosts(name,content,order,page,pageSize)
    }   

    @Get(':id')
    async getPostById(@Param('id',ParseIntPipe) id:number){
        return await this.postsService.getPostById(id)
    }

    @Post()
    async createPost(@Body() post:CreatePostDto){
        return await this.postsService.createPost(post)
    }
    
    @Put(':id')
    async updatePost(@Param('id',ParseIntPipe) id:number, @Body() post:UpdatePostDto){
        return await this.postsService.updatePost(id,post)
    }

    @Delete(':id')
    async deletePost(@Param('id',ParseIntPipe) id:number){
        return await this.postsService.deletePost(id)
    }
    

}