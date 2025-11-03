import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";


@Controller('posts')
export class PostsController {

    constructor(private postsService:PostsService){}

    @Get()
    getAllPosts() {
        return this.postsService.getAllPosts()
    }

    @Get(':id')
    getPostById(@Param('id',ParseIntPipe) id:number){
        return this.postsService.getPostById(id)
    }

    @Post()
    createPost(@Body() post:CreatePostDto){
        return this.postsService.createPost(post)
    }
    

}