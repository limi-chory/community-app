import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    @Post('signup')
    create(@Body() createUserRequest: CreateUserDto) {
        const { nickname, password, age, gender, eMail } = createUserRequest;
        return this.userService.create(createUserRequest);
    }

    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.userService.getOne(id);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { nickname, password } = loginDto;
        const user = await this.userService.validateUser(nickname, password);
        if (!user) {
            throw new UnauthorizedException('닉네임 또는 비밀번호가 일치하지 않습니다.');
        } else {
            // const secretKey:string = process.env.JWT_SECRET_KEY || "";
            const payload = { username: user.nickname, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }
    }

    @Patch(':id')
    updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        console.log("PATCH USER")
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: number) {
        return this.userService.deleteUser(id);
    }
}
