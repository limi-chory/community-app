import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    create() {
        return this.commentsService.create()
    }

    @Get(':postId')
    getAll(@Param('postId') postId: number) {

    }

    @Put(':commentId')
    update(@Param('commentId') commentId: number) {

    }

    @Delete(':commentId')
    delete(@Param('commentId') commentId: number) {

    }
}
