import { Controller } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';

@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {}
