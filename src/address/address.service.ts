import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create.address.dto';
import { ReturnAddressDto } from './dto/return.address.dto';
import { Company } from 'src/company/entities/company.entity';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly companyService: CompanyService,
  ) {}

  async findOne(addressId: number): Promise<ReturnAddressDto> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
      relations: ['company'],
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    return new ReturnAddressDto(address);
  }

  async findAllByCompanyId(companyId: number): Promise<ReturnAddressDto[]> {
    const addresses = await this.addressRepository.find({
      where: { company: { id: companyId } },
      relations: ['company'],
    });

    if (!addresses) {
      return [];
    }

    return addresses.map((address) => new ReturnAddressDto(address));
  }

  async create(createAddressDto: CreateAddressDto): Promise<ReturnAddressDto> {
    const { companyId, ...addressData } = createAddressDto;
    const company = await this.companyService.findOne(companyId);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    const address = this.addressRepository.create({ ...addressData, company });
    const createdAddress = await this.addressRepository.save(address);

    return new ReturnAddressDto(createdAddress);
  }

  async update(
    addressId: number,
    updateAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    Object.assign(address, updateAddressDto);
    const updatedAddress = await this.addressRepository.save(address);

    return new ReturnAddressDto(updatedAddress);
  }

  async delete(addressId: number): Promise<void> {
    const result = await this.addressRepository.delete(addressId);

    if (result.affected === 0) {
      throw new NotFoundException('Endereço não encontrado');
    }
  }
}
