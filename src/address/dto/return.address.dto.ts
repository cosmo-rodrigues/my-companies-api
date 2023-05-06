import { Company } from 'src/company/entities/company.entity';
import { Address as AddressEntity } from '../entities/address.entity';

export class ReturnAddressDto {
  id: number;
  name: string;
  zipCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  company: Company;

  constructor(address: AddressEntity) {
    this.id = address.id;
    this.name = address.name;
    this.zipCode = address.zipCode;
    this.street = address.street;
    this.number = address.number;
    this.district = address.district;
    this.city = address.city;
    this.state = address.state;
    this.company = address.company;
  }
}
