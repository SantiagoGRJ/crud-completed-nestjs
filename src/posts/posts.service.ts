import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { IPost } from "./interfaces/post.interface";
import { PrismaService } from "../prisma.service";
import { IImage } from "../interfaces/image.interface";
import { existsSync, unlink } from "fs";
import { join } from "path";


@Injectable()
export class PostsService {

    constructor(private prisma: PrismaService) { }

    async getAllPosts(name: string, content: string, orderBy: boolean, page: number, pageSize: number) {
        try {
            const orderB = orderBy ? 'desc' : 'asc'
            return await this.prisma.post.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                where: {
                    name: {
                        contains: name
                    },
                    content: {
                        contains: content
                    },

                },
                orderBy: {
                    id: orderB
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('Unexpected Error in Filtered Search')
        }
    }

    async getPostById(id: number) {

        const post = await this.prisma.post.findUnique({
            where: {
                id: id
            }
        })

        if (!post) {
            throw new NotFoundException(`Post with id ${id} not Found`)
        }

        return post

    }

    async createPost(post: IPost) {
        try {
            const newPost = await this.prisma.post.create({
                data: {
                    name: post.name,
                    content: post.content,
                    release_date: post.release_date,
                    path_image: post.path_image.filename
                }
            })

            return newPost

        } catch (error) {

            if (error.code === "P2002") {
                throw new ConflictException(`The ${error.meta?.target} is taken, try another different`)

            }

            throw new InternalServerErrorException('Create Post Error')
        }
    }

    async updatePost(id: number, post: IPost) {

        try {
            let postOld = await this.getPostById(id)
           
            if(postOld.path_image){
                const imagePath = join(process.cwd(),'uploads',postOld.path_image)
                
                if(existsSync(imagePath)){
                    unlink(imagePath,(err)=>{
                        if(err?.code !== 'ENOENT'){
                            console.log('Error deleting File: ',err);
                        }
                        console.log('File deleted');
                        
                    })
                }
            }


            const updatePost = await this.prisma.post.update({
                where: {
                    id: id
                },
                data: {
                    name: post.name,
                    content: post.content,
                    release_date: post.release_date,
                    path_image: post.path_image.filename
                }
            })
            return updatePost

        } catch (error) {
            if (error.code === "P2025") {
                throw new NotFoundException(`Post with id ${id} not found`)
            }
            if (error.code === "P2002") {
                throw new ConflictException(`The ${error.meta?.target} is taken, try another different`)
            }

            throw new InternalServerErrorException('Update Post Error')

        }

    }

    async deletePost(id: number) {
        
        try {
            const postDeleted = await this.getPostById(id)

            if(postDeleted.path_image){
                const imagePath = join(process.cwd(),'uploads',postDeleted.path_image)

                if(existsSync(imagePath)){
                    unlink(imagePath,(err)=>{
                        if(err){
                            console.log('Error deleting File: ',err);
                        }
                        console.log('File deleted');
                    })
                }

            }

            return await this.prisma.post.delete({
                where: {
                    id
                }
            })
        } catch (error) {
            if (error.code === "P2025") {
                throw new NotFoundException(`Post with id ${id} not found`)
            }
            throw new InternalServerErrorException(`Unexpected Error while deleting Post`)
        }
    }


}