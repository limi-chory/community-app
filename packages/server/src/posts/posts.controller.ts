import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Posts } from 'src/entities/posts.entity';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Post()
    create(@Body() createPostRequest: any) {
        const { title, contents } = createPostRequest
        return this.postsService.create(title, contents)
    }

    @Get()
    getAll() {
        return this.getAll()
    }

    @Get(':id')
    getOne(@Param('id') postId: number) {
        return this.getOne(postId)
    }

    @Put(':id')
    update(@Param('id') postId: number) {
        return this.update(postId)
    }

    @Delete(':id')
    delete(@Param('id') postId: number) {
        return this.delete(postId)
    }
}
