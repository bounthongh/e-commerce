import { Module } from '@nestjs/common';
import { CartProductsController } from './cartProducts.controller';
import { CartProductsService } from './cartProducts.service';
import { cartProductsProviders } from './cartProducts.providers';


@Module({
	controllers: [CartProductsController],
	providers: [CartProductsService, ...cartProductsProviders],
	exports: [CartProductsService]
})


export class CartProductsModule {}
