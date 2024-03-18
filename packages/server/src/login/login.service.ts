import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USERS } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class LoginService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly jwtService: JwtService,
    ) { }

    async login(username: string, password: string): Promise<{ accessToken: string }> {
        const user = await this.entityManager
            .createQueryBuilder(USERS, 'user')
            .where('user.nickname = :username', { username })
            .andWhere('user.password = :password', { password })
            .getOne();
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        } else {
            const payload = { username: user.nickname, sub: user.id };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
        }
    }

}
