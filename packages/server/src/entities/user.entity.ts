import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Gender } from "./gender.enum";
import { Posts } from "./posts.entity";
import { IsEmail, IsNotEmpty, Matches, Min } from "class-validator";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({ unique: true })
    nickname: string;

    @IsNotEmpty()
    @Matches(/^(?=.*[\dA-Za-z])(?=.*[\W_]).{8,}$/, { message: '비밀번호는 8자 이상이며, 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.' })
    @Column()
    password: string;

    @IsNotEmpty()
    @IsEmail({}, { message: '유효한 이메일 주소가 아닙니다.' })
    @Column()
    eMail: string;

    @IsNotEmpty()
    @Min(15, { message: '나이는 15세 이상이어야 합니다.' })
    @Column()
    age: number;

    @IsNotEmpty()
    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender;

    @IsNotEmpty()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @OneToMany(() => Posts, post => post.author)
    posts: Posts[];

    @OneToMany(() => Comment, comment => comment.author)
    comment: Comment[];
}