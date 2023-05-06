import { IsOptional, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsOptional()
  readonly id: number;

  @IsString({ message: 'O nome deve ser uma string.' })
  readonly name: string;

  @IsString({ message: 'O site deve ser uma string' })
  readonly website: string;

  @IsString({ message: 'O CNPJ deve ser uma string.' })
  readonly cnpj: string;
}
