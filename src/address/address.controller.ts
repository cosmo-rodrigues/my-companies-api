import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create.address.dto';
import { ReturnAddressDto } from './dto/return.address.dto';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get(':addressId')
  findOne(@Param('addressId') addressId: number): Promise<ReturnAddressDto> {
    return this.addressService.findOne(addressId);
  }

  @Get()
  async findAllByCompanyId(
    @Body('companyId') companyId: number,
  ): Promise<ReturnAddressDto[]> {
    return this.addressService.findAllByCompanyId(companyId);
  }

  @Post()
  create(
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    return this.addressService.create(createAddressDto);
  }

  @Put(':addressId')
  update(
    @Param('addressId') addressId: number,
    @Body() updateAddressDto: CreateAddressDto,
  ): Promise<ReturnAddressDto> {
    return this.addressService.update(addressId, updateAddressDto);
  }

  @Delete(':addressId')
  delete(@Param('addressId') addressId: number): Promise<void> {
    return this.addressService.delete(addressId);
  }
}
