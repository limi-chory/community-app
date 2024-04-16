import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/entities/user.entity";

export class CreatePostDto {
    @ApiProperty({ description: 'post 제목' })
    title: string;

    @ApiProperty({ description: 'post 콘텐츠' })
    contents: string;

    @ApiProperty({ description: 'post 작성자' })
    author: User;
}

export class GetPostDto {
    title: string;

    contents: string;

    author: User;

    createdAt: Date;

    updatedAt: Date;

    comments: Comment[];
}

export class UpdatePostDto {
    title?: string;

    contents?: string;

    updateAt: Date;
}