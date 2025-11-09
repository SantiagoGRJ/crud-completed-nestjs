import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { PostsModule } from './posts/posts.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [MulterModule.register({
    dest: './upload',
  }),
    PostsModule, ConfigModule.forRoot(), PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
