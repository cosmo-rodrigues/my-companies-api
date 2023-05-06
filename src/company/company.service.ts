import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { Company } from 'src/company/entities/company.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create.company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    private readonly userService: UserService,
  ) {}
  async findOne(
    createCompanyDto: CreateCompanyDto,
    userId,
  ): Promise<CreateCompanyDto> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const company = await this.companyRepository.findOne({
      where: { id: createCompanyDto.id },
    });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return company;
  }

  async findAll(createCompanyDto: CreateCompanyDto, userId) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const companies = await this.companyRepository.find({
      where: { id: createCompanyDto.id },
    });

    if (!companies) {
      return [];
    }

    return companies;
  }

  create(createCompanyDto: CreateCompanyDto) {
    return createCompanyDto;
  }
}
