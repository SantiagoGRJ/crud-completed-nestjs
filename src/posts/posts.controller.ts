import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller('posts')
@ApiTags('posts')
export class PostsController {

    constructor(private postsService:PostsService){}

    @Get()
    @ApiOperation({summary:'Get All Posts'})
    @ApiResponse({status:200, description:'Return all Posts'})
    @ApiResponse({status:403, description:'Forbidden.'})
    async getAllPosts() {
        return await this.postsService.getAllPosts()
    }

    @Get(':id')
    @ApiOperation({summary:'Get Post By Id'})
    @ApiResponse({status:200, description:'Return Post'})
    @ApiResponse({status:404,description:'Not Found'})
    @ApiResponse({status:400,description:'Forbidden'})
    async getPostById(@Param('id',ParseIntPipe) id:number){
        return await this.postsService.getPostById(id)
    }

    @Post()
    @ApiOperation({summary:'Create Post'})
    async createPost(@Body() post:CreatePostDto){
        return await this.postsService.createPost(post)
    }
    
    @Put(':id')
    @ApiOperation({summary:'Update Post'})
    async updatePost(@Param('id',ParseIntPipe) id:number, @Body() post:UpdatePostDto){
        return await this.postsService.updatePost(id,post)
    }

    @Delete(':id')
    @ApiOperation({summary:'Delete Post'})
    async deletePost(@Param('id',ParseIntPipe) id:number){
        return await this.postsService.deletePost(id)
    }
    

}