import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { MarketsModule } from './modules/markets/markets.module';
import { UsersModule } from './modules/users/users.module';
import { VendorsModule } from './modules/vendors/vendors.module';
import { CustomersModule } from './modules/customers/customers.module';
import { ProductsModule } from './modules/products/products.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { CartsModule } from './modules/carts/carts.module';
import { DropoffsModule } from './modules/dropoffs/dropoffs.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';


@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		UsersModule,
		CustomersModule,
		VendorsModule,
		MarketsModule,
		ProductsModule,
		CartsModule,
		BookingsModule,
		DropoffsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})


export class AppModule {}
