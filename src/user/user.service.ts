import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UserService {
  findOne(id: number) {
    return {
      id,
    };
  }

  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }
}
