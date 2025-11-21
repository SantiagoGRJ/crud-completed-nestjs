import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','uploads'),
      serveRoot:'/uploads'
    })
    ,PostsModule, ConfigModule.forRoot(), PrismaModule, AuthModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
