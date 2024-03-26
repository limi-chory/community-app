import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "src/entities/gender.enum";

export class CreateUserDto {
    @ApiProperty({ description: 'user 닉네임' })
    nickname: string;

    @ApiProperty({ description: 'user PW' })
    password: string;

    @ApiProperty({ description: 'user 나이' })
    age: number;

    @ApiProperty({ description: 'user 성별' })
    gender: Gender;

    @ApiProperty({ description: 'user e-mail' })
    eMail: string;
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