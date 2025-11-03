import {  Injectable, NotFoundException } from "@nestjs/common";
import { IPost } from "./interfaces/cat.interface";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PostsService{

     constructor (private prisma:PrismaService) {}


    private posts : IPost[] = [
        {
            name:'first title',
            content:'first content',
            release_date:12
        }
    ]

   async getAllPosts () {
        return await this.prisma.post.findMany()
    }

    getPostById(id:number){
        const post = this.posts.find(value => value.id === id)

        if(!post){
            return new NotFoundException(`Post with id ${id} not found`)
        }
        return post

    }

    async createPost(post:IPost) {
       return await this.prisma.post.create({data:post})
    }

    updatePost(id:number,post:IPost){

    }
    

}