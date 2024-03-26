import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from 'src/entities/comment.entity';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Get(':postId')
    async getAllByPostId(@Param('postId') postId: number): Promise<Comment[]> {
        return this.commentsService.getAllByPostId(postId);
    }

    @Post()
    async create(@Body() commentData: Partial<Comment>): Promise<Comment> {
        return this.commentsService.create(commentData);
    }

    @Put(':commentId')
    async update(@Param('commentId') commentId: number, @Body() commentData: Partial<Comment>): Promise<Comment> {
        return this.commentsService.update(commentId, commentData);
    }

    @Delete(':commentId')
    async delete(@Param('commentId') commentId: number): Promise<void> {
        return this.commentsService.delete(commentId);
    }
}
