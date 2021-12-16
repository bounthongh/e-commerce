import { productsProviders } from './products.providers';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Module } from '@nestjs/common';


@Module({
	controllers: [ProductsController],
	providers: [ProductsService, ...productsProviders],
	exports: [ProductsService]
})


export class ProductsModule {}
