import { Injectable, NotFoundException } from '@nestjs/common';
import { Posts } from 'src/entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, UpdatePostDto } from './dtos/posts.dto';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private readonly postsRepository: Repository<Posts>,
    ) { }

    async create(createPostRequest: CreatePostDto): Promise<Posts> {
        const { title, contents, author } = createPostRequest;
        const post = this.postsRepository.create({ title, contents, author });
        return this.postsRepository.save(post);
    }

    async getAll(): Promise<Posts[]> {
        return this.postsRepository.find();
    }

    async getOne(postId: number): Promise<Posts> {
        const post = await this.postsRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} is not found.`);
        }
        return post;
    }

    async update(postId: number, postData: UpdatePostDto): Promise<Posts> {
        const post = await this.postsRepository.findOne({ where: { id: postId } });
        if (!post) {
            throw new NotFoundException(`Post with ID ${postId} is not found.`);
        }

        if (postData.title) {
            post.title = postData.title;
        }
        if (postData.contents) {
            post.contents = postData.contents;
        }
        post.updatedAt = new Date();
        await this.postsRepository.save(post);

        return this.postsRepository.findOne({ where: { id: postId } });
    }

    async delete(postId: number): Promise<void> {
        try {
            await this.getOne(postId);
            await this.postsRepository.delete(postId);
            return;
        } catch (error) {
            console.error(`Error deleting post with ID ${postId}: ${error.message}`);
            throw error;
        }
    }
}
