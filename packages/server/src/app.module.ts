import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsModule } from './comments/comments.module';
import { Posts } from './entities/posts.entity';
import { PostsModule } from './posts/posts.module';
import { User } from './entities/user.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PostsService } from './posts/posts.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test2',
    password: 'test',
    database: 'test',
    synchronize: true,
    entities: [Comment, Posts, User],
  }), CommentsModule, PostsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
