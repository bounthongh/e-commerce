import { Test, TestingModule } from '@nestjs/testing';
import { CartProductsService } from './cartProducts.service';
import { cartProductsProviders } from './cartProducts.providers';
import { databaseProviders } from '../database/database.providers';


describe('CartProducts Service', () =>
{
	let service: CartProductsService;
	beforeEach(async () =>
	{

		const module: TestingModule = await Test.createTestingModule({
  			providers: [CartProductsService, ...cartProductsProviders, ...databaseProviders],
		}).compile();

		service = module.get<CartProductsService>(CartProductsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
