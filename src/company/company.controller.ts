import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete, Put } from '@nestjs/common/decorators';
import { Roles } from 'src/decorators/roles.decorator';
import { UserId } from 'src/decorators/user.id.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create.company.dto';
import { ReturnCompanyDto } from './dto/returncompany.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  async findAll(@UserId() userId: number): Promise<ReturnCompanyDto[]> {
    return this.companyService.findAll(userId);
  }

  @Get(':companyId')
  findOne(@Param('companyId') companyId: number) {
    return this.companyService.findOne(companyId);
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @UserId() userId: number) {
    try {
      return this.companyService.create(createCompanyDto, userId);
    } catch (error) {
      return { error: error.message };
    }
  }

  @Put(':companyId')
  async update(
    @Param('companyId') companyId: number,
    @Body() updateCompanyDto: CreateCompanyDto,
    @UserId() userId: number,
  ): Promise<ReturnCompanyDto> {
    return this.companyService.update(companyId, updateCompanyDto, userId);
  }

  @Delete(':companyId')
  async delete(
    @Param('companyId') companyId: number,
    @UserId() userId: number,
  ): Promise<void> {
    await this.companyService.delete(companyId, userId);
  }
}
