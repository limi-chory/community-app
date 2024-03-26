import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) { }

    @Post()
    async login(@Body() user: { username: string, password: string }) {
        const { username, password } = user;
        return this.loginService.login(username, password);
    }
}
