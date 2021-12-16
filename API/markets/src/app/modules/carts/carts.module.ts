import { cartsProviders } from './carts.providers';
import { CartsService } from './carts.service';
import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CartsController } from './carts.controller';


@Module({
	imports: [ProductsModule],
	controllers: [CartsController],
	providers: [CartsService, ...cartsProviders],
	exports: [CartsService]
})


export class CartsModule {}
