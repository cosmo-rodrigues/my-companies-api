import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  findOne(id: string) {
    return {
      id,
    };
  }

  findAll() {
    return [];
  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
