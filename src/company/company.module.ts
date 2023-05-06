import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  imports: [UserModule],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
