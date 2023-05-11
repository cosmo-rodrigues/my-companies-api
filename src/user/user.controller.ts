import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { ReturnUserDto } from './dto/return.user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user.type.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserType.User, UserType.Admin)
  @Get()
  async findAll(): Promise<ReturnUserDto[]> {
    try {
      return (await this.userService.findAll()).map(
        (user) => new ReturnUserDto(user),
      );
    } catch (error) {
      return error;
    }
  }

  @Roles(UserType.User, UserType.Admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(UserType.User, UserType.Admin)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Roles(UserType.User, UserType.Admin)
  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.userService.deleteOne(id);
  }
}
