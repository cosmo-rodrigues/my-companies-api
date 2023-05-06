import { User } from 'src/user/entities/user.entity';
export class ReturnUserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;

  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
  }
}
