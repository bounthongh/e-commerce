import { customersProviders } from './customers.providers';
import { CustomersService } from './customers.service';
import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';


@Module({
	controllers: [CustomersController],
	providers: [CustomersService, ...customersProviders],
	exports: [CustomersService]
})


export class CustomersModule {}
