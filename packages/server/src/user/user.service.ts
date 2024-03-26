import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async create(createUserRequest: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserRequest.password, 10);
        const newUser = this.userRepository.create({ ...createUserRequest, password: hashedPassword, createdAt: new Date() });
        return this.userRepository.save(newUser);
    }

    async getAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getOne(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { nickname: username } });
    }

    async update(username: string, updateUserDto: UpdateUserDto): Promise<User> {
        console.log(username, updateUserDto)
        const user = await this.userRepository.findOne({ where: { nickname: username } });
        if (!user) {
            throw new NotFoundException(`User with ID ${username} is not found.`);
        }
        if (updateUserDto.password) {
            const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
            updateUserDto.password = hashedPassword;
        }
        await this.userRepository.update(user.nickname, updateUserDto);
        return this.userRepository.findOne({ where: { nickname: username } });
    }

    async deleteUser(username: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { nickname: username } });
        if (!user) {
            throw new NotFoundException(`User with ID ${username} is not found.`);
        }
        await this.userRepository.delete(user.nickname);
        return;
    }

    async validateUser(nickname: string, password: string): Promise<User | null> {
        const user = await this.getOne(nickname);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

}
