import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsController } from './cartProducts.controller';
import { CartProductsService } from './cartProducts.service';
import { cartProductsProviders } from './cartProducts.providers';
import { databaseProviders } from '../database/database.providers';


describe('CartProducts Controller', () =>
{
	let controller: CartProductsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [CartProductsController],
			providers: [CartProductsService, ...cartProductsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<CartProductsController>(CartProductsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
