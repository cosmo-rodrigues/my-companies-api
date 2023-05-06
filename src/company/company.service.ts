import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/company/entities/company.entity';
import { ReturnUserDto } from 'src/user/dto/return.user.dto';
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
    returnUserDto: ReturnUserDto,
    companyId: number,
  ): Promise<CreateCompanyDto> {
    const user = await this.userService.findUserByEmail(returnUserDto.email);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const company = await this.companyRepository.findOne({
      where: { id: companyId },
    });
    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }
    return company;
  }

  async findAll(userId: number): Promise<Company[]> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const companies = await this.companyRepository.find({
      where: { user: { id: userId } },
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
