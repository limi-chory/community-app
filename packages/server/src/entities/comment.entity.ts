import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "./posts.entity";
import { User } from "./user.entity";
@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contents: string;

    @Column()
    isDeleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @ManyToOne(() => Posts, post => post.comments)
    post: Posts;

    @ManyToOne(() => User, user => user.comment)
    author: User;
}