import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";


@Controller('posts')
export class PostsController {

    constructor(private postsService:PostsService){}

    @Get()
    async getAllPosts() {
        return await this.postsService.getAllPosts()
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