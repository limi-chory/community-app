import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty, Matches, Min } from "class-validator";
import { Gender } from "src/entities/gender.enum";

export class CreateUserDto {
    @ApiProperty({ description: 'user 닉네임' })
    @IsNotEmpty()
    nickname: string;

    @ApiProperty({ description: 'user PW' })
    @IsNotEmpty()
    @Matches(/^(?=.*[\dA-Za-z])(?=.*[\W_]).{8,}$/, { message: '비밀번호는 8자 이상이며, 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.' })
    password: string;

    @ApiProperty({ description: 'user 나이' })
    @IsNotEmpty()
    @Min(15, { message: '나이는 15세 이상이어야 합니다.' })
    age: number;

    @ApiProperty({ description: 'user 성별' })
    @IsNotEmpty()
    gender: Gender;

    @ApiProperty({ description: 'user e-mail' })
    @IsNotEmpty()
    @IsEmail({}, { message: '유효한 이메일 주소가 아닙니다.' })
    eMail: string;
}

export class GetUserDto {
    nickname: string;

    age: number;

    gender: Gender;

    eMail: string;

    @Exclude()
    password: string;
}

export class UpdateUserDto {
    nickname?: string;

    password?: string;

    age?: number;

    gender?: Gender;

    eMail?: string;
}

export class LoginDto {
    nickname: string;

    password: string;
}