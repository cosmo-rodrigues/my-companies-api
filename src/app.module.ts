import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [UserModule, CompanyModule, AddressModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
