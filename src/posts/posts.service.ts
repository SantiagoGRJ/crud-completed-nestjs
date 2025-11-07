import {  ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { IPost } from "./interfaces/cat.interface";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PostsService{

    constructor (private prisma:PrismaService) {}

   async getAllPosts (name:string,content:string,orderBy:boolean) {
        const orderB  = orderBy ? 'desc' : 'asc'
        return await this.prisma.post.findMany({
            where:{
                name:{
                    contains:name
                },
                content:{
                    contains:content
                },

            },
            orderBy:{
                id:orderB
            }
        })
    }

   async getPostById(id:number){
        const post = await this.prisma.post.findUnique({
            where:{
                id:id
            }
        })

        if(!post){
            return new NotFoundException(`Post with id ${id} not found`)
        }
        return post

    }

    async createPost(post:IPost) {
       try {
        const newPost = await this.prisma.post.create({data:post}) 

        return newPost

       } catch (error) {
        
        if(error.code === "P2002"){
            throw new ConflictException(`The ${error.meta?.target} is taken, try another different`)
        
        }
        
        throw new InternalServerErrorException('Create Post Error')
       }   
    }

    async updatePost(id:number,post:IPost){
       
        try{
             const updatePost = await this.prisma.post.update({
            where:{
                id:id
            },
            data:post
        })
        return updatePost
        
        }catch (error) {
            if(error.code === "P2025"){
                throw new NotFoundException(`Post with id ${id} not found`)
            }
            if(error.code === "P2002"){
                throw new ConflictException(`The ${error.meta?.target} is taken, try another different`)
            }

            throw new InternalServerErrorException('Update Post Error')

        }

    }

    async deletePost(id:number){
        try{
            return await this.prisma.post.delete({
                where:{
                    id
                }
            })
        }catch(error){
            if(error.code === "P2025"){
                throw new NotFoundException(`Post with id ${id} not found`)
            }
            throw new InternalServerErrorException(`Unexpected Error while deleting Post`)
        }
    }
    

}