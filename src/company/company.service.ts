import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create.company.dto';
import { ReturnCompanyDto } from './dto/returncompany.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly userService: UserService,
  ) {}

  async existsCompany(createCompanyDto: CreateCompanyDto): Promise<void> {
    const cnpjExists = await this.companyRepository.findOne({
      where: { cnpj: createCompanyDto.cnpj },
    });
    const websiteExists = await this.companyRepository.findOne({
      where: { website: createCompanyDto.website },
    });
    if (cnpjExists) {
      throw new ConflictException('CNPJ já cadastrado');
    }
    if (websiteExists) {
      throw new ConflictException('Website já cadastrado');
    }
  }
  async findOne(companyId: number): Promise<CreateCompanyDto> {
    let company = undefined;
    company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['addresses', 'user'],
    });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return company;
  }

  async findAll(userId: number): Promise<ReturnCompanyDto[]> {
    const companies = await this.companyRepository.find({
      where: { user: { id: userId } },
      relations: ['addresses', 'user'],
    });

    return companies.map((company) => new ReturnCompanyDto(company));
  }

  async create(createCompanyDto: CreateCompanyDto, userId: number) {
    const user = await this.userService.findOne(userId);
    await this.existsCompany(createCompanyDto);
    const company = this.companyRepository.create(createCompanyDto);
    company.user = user;
    return this.companyRepository.save(company);
  }

  async update(
    companyId: number,
    updateCompanyDto: CreateCompanyDto,
    userId: number,
  ): Promise<ReturnCompanyDto> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['user'],
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    if (company.user.id !== userId) {
      throw new UnauthorizedException(
        'Você não tem permissão para atualizar esta empresa',
      );
    }

    if (
      (updateCompanyDto.cnpj && updateCompanyDto.cnpj !== company.cnpj) ||
      (updateCompanyDto.website && updateCompanyDto.website !== company.website)
    ) {
      const existingCompany = await this.companyRepository.findOne({
        where: [
          { cnpj: updateCompanyDto.cnpj },
          { website: updateCompanyDto.website },
        ],
      });

      if (existingCompany) {
        throw new ConflictException('CNPJ ou Website já cadastrado');
      }
    }

    Object.assign(company, updateCompanyDto);
    await this.companyRepository.save(company);

    return new ReturnCompanyDto(company);
  }

  async delete(companyId: number, userId: number): Promise<void> {
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
      relations: ['user'],
    });

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    if (company.user.id !== userId) {
      throw new UnauthorizedException(
        'Você não tem permissão para excluir esta empresa',
      );
    }

    await this.companyRepository.remove(company);
  }
}
