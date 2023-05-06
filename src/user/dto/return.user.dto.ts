import { User } from 'src/user/entities/user.entity';
export class ReturnUserDto {
  readonly name: string;
  readonly email: string;

  constructor(userEntity: User) {
    this.name = userEntity.name;
    this.email = userEntity.email;
  }
}
