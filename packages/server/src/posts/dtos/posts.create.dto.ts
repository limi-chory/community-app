import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({ description: 'post 제목' })
    title: string;

    @ApiProperty({ description: 'post 콘텐츠' })
    contents: string;

    @ApiProperty({ description: 'post 작성 날짜' })
    createdAt: Date;

    @ApiProperty({ description: 'post 수정 날짜' })
    updatedAt: Date;

    @ApiProperty({ description: 'post 댓글' })
    comments: Comment[];
}