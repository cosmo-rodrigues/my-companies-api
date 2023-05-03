import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create.company.dto';

@Injectable()
export class CompanyService {
  findOne(id: string) {
    return {
      id,
    };
  }

  findAll() {
    return [];
  }

  create(createCompanyDto: CreateCompanyDto) {
    return createCompanyDto;
  }
}
