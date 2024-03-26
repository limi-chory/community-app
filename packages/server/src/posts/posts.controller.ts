import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/posts.entity';
import { CreatePostDto } from './dtos/posts.create.dto';

@ApiTags('post')
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    @ApiOperation({ description: 'post 생성하기' })
    @ApiBody({ type: CreatePostDto, description: 'post 생성 데이터' })
    create(@Body() createPostRequest: CreatePostDto) {
        const { title, contents } = createPostRequest
        return this.postsService.create(title, contents)
    }

    @Get()
    getAll() {
        return this.postsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') postId: number) {
        return this.postsService.getOne(postId)
    }

    @Patch(':id')
    update(@Param('id') postId: number, @Body() postData: Partial<Posts>) {
        return this.postsService.update(postId, postData)
    }

    @Delete(':id')
    delete(@Param('id') postId: number) {
        return this.postsService.delete(postId)
    }
}
