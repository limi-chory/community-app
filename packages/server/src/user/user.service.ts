import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, GetUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserRequest: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { nickname: createUserRequest.nickname } });
        if (existingUser) {
            throw new ConflictException("이미 사용중인 닉네임입니다.");
        }
        const hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
        const newUser = this.userRepository.create({ ...createUserRequest, password: hashedPassword });
        return this.userRepository.save(newUser);
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getOne(userId: number): Promise<{ userData: GetUserDto }> {
        const userData = await this.userRepository.findOne({
            where: { id: userId },
            select: []
        });
        return { userData: userData };
    }

    async update(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} is not found.`);
        }
        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
            updateUserDto.password = hashedPassword;
        }
        await this.userRepository.update(user.nickname, updateUserDto);
        return this.userRepository.findOne({ where: { id: userId } });
    }

    async deleteUser(userId: number): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} is not found.`);
        }
        await this.userRepository.delete(user.id);
        return;
    }

    async validateUser(nickname: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { nickname: nickname } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            throw new UnauthorizedException();
        }
    }

}
