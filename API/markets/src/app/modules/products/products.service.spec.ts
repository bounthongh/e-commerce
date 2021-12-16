import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { productsProviders } from './products.providers';
import { databaseProviders } from '../database/database.providers';


describe('Product Service', () =>
{
	let service: ProductsService;

	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [ProductsService, ...productsProviders, ...databaseProviders],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
