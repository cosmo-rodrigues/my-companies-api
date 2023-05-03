import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  readonly name: string;

  @IsString({ message: 'O site deve ser uma string' })
  readonly website: string;

  @IsString({ message: 'O CNPJ deve ser uma string.' })
  readonly cnpj: string;
}
