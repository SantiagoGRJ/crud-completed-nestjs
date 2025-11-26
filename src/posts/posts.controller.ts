import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { ValidateorderPipe } from "./pipes/validateorder/validateorder.pipe";
import { SearchQueryDto } from "./dto/search-query.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileSizeValidationPipe } from "./pipes/file-size-validation/file-size-validation.pipe";
import { RolesAuth } from "../roles/guards/roles.guard";
import { Roles } from "../roles/decorators/roles.decorator";
import { Role } from "../roles/enum/roles.enum";
import { AuthGuard } from "../auth/guard/auth.guard";


@Controller('posts')

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

    @UseGuards(AuthGuard,RolesAuth)
    @Roles(Role.ADMIN)
    @Get(':id')
    async getPostById(@Param('id',ParseIntPipe) id:number){
        return await this.postsService.getPostById(id)
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async createPost(
        @Body() post:CreatePostDto,
        @UploadedFile(new FileSizeValidationPipe) file:Express.Multer.File
    ){
        const newPost={
            ...post,
            path_image:file
        }

        return await this.postsService.createPost(newPost)
    }   
    
    @Put(':id')
    @UseInterceptors(FileInterceptor('image'))
    async updatePost(
        @Param('id',ParseIntPipe) id:number, 
        @Body() post:UpdatePostDto,
        @UploadedFile(new FileSizeValidationPipe)  file: Express.Multer.File
    ){
        const updatePost = {
            ...post,
            path_image:file
        }
        return await this.postsService.updatePost(id,updatePost)
    }

    @Delete(':id')
    async deletePost(@Param('id',ParseIntPipe) id:number){
        return await this.postsService.deletePost(id)
    }
    

}