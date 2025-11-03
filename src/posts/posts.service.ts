import {  Injectable, NotFoundException } from "@nestjs/common";
import { IPost } from "./interfaces/cat.interface";

@Injectable()
export class PostsService{

    private posts : IPost[] = [
        {
            title:'first title',
            content:'first content',
            release_date:12
        }
    ]

    getAllPosts () {
        return this.posts
    }

    getPostById(id:number){
        const post = this.posts.find(value => value.id === id)

        if(!post){
            return new NotFoundException(`Post with id ${id} not found`)
        }
        return post

    }

    createPost(post:IPost) {
        this.posts.push({
            ...post,
            id:this.posts.length+1,
        })
        return post
    }

    updatePost(id:number,post:IPost){

    }
    

}