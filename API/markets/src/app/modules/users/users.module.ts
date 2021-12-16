import { Module } from '@nestjs/common';
import { VendorsModule } from '../vendors/vendors.module';
import { CustomersModule } from '../customers/customers.module';
import { MarketVendorsModule } from '../marketVendors/marketVendors.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';


@Module({
	imports: [VendorsModule, CustomersModule, MarketVendorsModule],
	controllers: [UsersController],
	providers: [UsersService, ...usersProviders],
	exports: [UsersService]
})


export class UsersModule {}
