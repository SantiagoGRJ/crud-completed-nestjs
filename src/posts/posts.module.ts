import { BadRequestException, Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";


@Module({
    imports: [
        MulterModule.register({
            storage:diskStorage({
                destination:'./uploads',
                filename:(req,file,cb) => {
                    const filename =`${Date.now()}-${file.originalname}`
                    cb(null,filename.split(' ').join(''))
                }
            }),
            fileFilter: (req,file,cb) => {
                const allowedTypes = ['image/png','image/jpg','image/jpeg']
                if(!allowedTypes.includes(file.mimetype)){
                  cb(new BadRequestException('Image must be JPG, PNG or JPEG'),false)
                  return
                }
                cb(null,true)
            }
        })
    ],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostsModule { }