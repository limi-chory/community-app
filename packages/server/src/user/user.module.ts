import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { jwtConstant } from './auth/auth.constant';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstant.secretKey,
            signOptions: { expiresIn: '1h' }
        })
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
