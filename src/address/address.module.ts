import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from 'src/company/company.module';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Address as AddressEntity } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity]), CompanyModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
