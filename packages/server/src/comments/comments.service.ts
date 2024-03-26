import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private readonly commentRepository: Repository<Comment>) { }

    async getAllByPostId(postId: number): Promise<Comment[]> {
        return this.commentRepository.find({ where: { post: { id: postId } } });
    }

    async create(comment: Partial<Comment>): Promise<Comment> {
        return this.commentRepository.save(comment);
    }

    async update(commentId: number, commentData: Partial<Comment>): Promise<Comment> {
        const comment = await this.commentRepository.findOne({ where: { id: commentId } });
        if (!comment) {
            throw new NotFoundException(`Commnet with ID ${commentId} not found.`);
        }
        await this.commentRepository.update(commentId, commentData);
        return this.commentRepository.findOne({ where: { id: commentId } });
    }

    async delete(commentId: number): Promise<void> {
        const result = await this.commentRepository.delete(commentId);
        if (result.affected === 0) {
            throw new NotFoundException(`Commnet with ID ${commentId} not found.`);
        }
    }
}
