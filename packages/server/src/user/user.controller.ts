import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
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

    @Get(':nickname')
    getOne(@Param('nickname') userName: string) {
        return this.userService.getOne(userName);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { nickname, password } = loginDto;
        const user = await this.userService.validateUser(nickname, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        } else {
            const payload = { username: user.nickname, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }
    }

    @Patch(':nickname')
    updateUser(@Param('nickname') username: string, @Body() updateUserDto: UpdateUserDto) {
        console.log("PATCH USER")
        return this.userService.update(username, updateUserDto);
    }

    @Delete(':nickname')
    deleteUser(@Param('nickname') username: string) {
        return this.userService.deleteUser(username);
    }
}
