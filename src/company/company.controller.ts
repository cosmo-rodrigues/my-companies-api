import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user.id.decorator';
import { ReturnUserDto } from 'src/user/dto/return.user.dto';
import { UserType } from 'src/user/enum/user-type.enum';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create.company.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  findAll(@UserId() userId: number) {
    return this.companyService.findAll(userId);
  }

  @Get(':companyId')
  findOne(
    @Body() returnUserDto: ReturnUserDto,
    @Param('companyId') companyId: number,
  ) {
    return this.companyService.findOne(returnUserDto, companyId);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }
}
