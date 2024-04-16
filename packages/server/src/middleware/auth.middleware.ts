import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }

    use(req: Request, res: Response, next: NextFunction) {
        const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
        if (userToken) {
            try {
                const jwtDecoded = this.jwtService.verify(userToken);
                const username = jwtDecoded.username;
                req.currentUser = username;
                next();
            } catch (error) {
                res.status(400).send("사용자 정보를 확인할 수 없습니다.");
            }
        } else {
            res.status(400).send("로그인이 필요한 서비스입니다.");
            return;
        }
    }
}
