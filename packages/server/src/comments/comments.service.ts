import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(Comment) private readonly comments: Repository<Comment>) { }

    async create() {
        console.log("START")
        const comment = await this.comments.create({ contents: 'test', isDeleted: false })
        console.log(comment)
        const result = await this.comments.save(comment)
        console.log(result)
    }

    getAll(postId: number) {

    }

    update(commentId: number) {

    }

    delete(commentId: number) {

    }
}
