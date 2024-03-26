import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { Posts } from "./posts.entity";

@Entity()
export class User {
    // @PrimaryGeneratedColumn()
    @Generated()
    id: number;

    @PrimaryColumn({ unique: true })
    nickname: string;

    @Column()
    password: string;

    @Column()
    eMail: string;

    @Column()
    age: number;

    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => Posts, post => post.author)
    posts: Posts[];
}