import { ReturnAddressDto } from 'src/address/dto/return.address.dto';
import { User } from 'src/user/entities/user.entity';
import { Company } from '../entities/company.entity';

export class ReturnCompanyDto {
  readonly id: number;
  readonly name: string;
  readonly website: string;
  readonly cnpj: string;
  readonly user: User;
  readonly addresses: ReturnAddressDto[];

  constructor(company: Company) {
    this.id = company.id;
    this.name = company.name;
    this.website = company.website;
    this.cnpj = company.cnpj;
    this.user = company.user;
    this.addresses = company.addresses.map(
      (address) => new ReturnAddressDto(address),
    );
  }
}
