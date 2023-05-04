import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  readonly name: string;

  @IsString({ message: 'O CEP deve ser uma string.' })
  readonly zipCode: string;

  @IsString({ message: 'O site deve ser uma string' })
  readonly street: string;

  @IsString({ message: 'O número deve ser uma string' })
  readonly number: string;

  @IsString({ message: 'O bairro deve ser uma string' })
  readonly district: string;

  @IsString({ message: 'A cidade deve ser uma string' })
  readonly city: string;

  @IsString({ message: 'O estado deve ser uma string' })
  readonly state: string;
}
