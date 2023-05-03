import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create.company.dto';

export class UpdateUserDto extends PartialType(CreateCompanyDto) {}
