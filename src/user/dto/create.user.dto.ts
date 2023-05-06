import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  readonly id: number;

  @IsString({ message: 'O nome deve ser uma string.' })
  readonly name: string;

  @IsEmail(
    { allow_display_name: true },
    { message: 'O email deve ser um email válido.' },
  )
  readonly email: string;

  @IsString({ message: 'A senha deve ser uma string.' })
  readonly password: string;
}
