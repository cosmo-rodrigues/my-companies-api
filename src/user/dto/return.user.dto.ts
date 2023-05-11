import { User } from 'src/user/entities/user.entity';
export class ReturnUserDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly typeUser: number;
  readonly accessToken?: string;

  constructor(userEntity: User) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.typeUser = userEntity.typeUser;
    this.accessToken = userEntity.accessToken;
  }
}
