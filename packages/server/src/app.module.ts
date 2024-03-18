import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsModule } from './comments/comments.module';
import { Posts } from './entities/posts.entity';
import { PostsModule } from './posts/posts.module';
import { USERS } from './entities/user.entity';
import { LoginModule } from './login/login.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    synchronize: true,
    entities: [Comment, Posts, USERS],
  }), CommentsModule, PostsModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
