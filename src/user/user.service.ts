import { Injectable, NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/user/entities/user.entity';
import {
  createPasswordHashed,
  validatePassword,
} from 'src/utils/password.utils';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdatePasswordDTO } from './dto/update.password.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ReturnUserDto } from './dto/return.user.dto';
import { LoginPayload } from 'src/auth/dto/login.payload.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async findOne(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário não encontrado`);
    }

    user.password = undefined;

    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException(`Email inválido`);
    }

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return (await this.userRepository.find()).map((user) => {
      user.password = undefined;
      return user;
    });
  }

  async create(createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new ConflictException('Email já cadastrado.');
    }
    const passwordHashed = await createPasswordHashed(createUserDto.password);

    const createdUser = await this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
    });

    createdUser.password = undefined;

    return {
      ...createdUser,
      accessToken: this.jwtService.sign({
        ...new LoginPayload(createdUser),
      }),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return await this.userRepository.update(id, updateUserDto);
  }

  async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDTO,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findOne(userId);

    const passwordHashed = await createPasswordHashed(
      updatePasswordDTO.newPassword,
    );

    const isMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new Error('Última senha incorreta.');
    }

    return await this.userRepository.save({
      ...user,
      password: passwordHashed,
    });
  }

  async deleteOne(id: number) {
    return await this.userRepository.delete(id);
  }
}
