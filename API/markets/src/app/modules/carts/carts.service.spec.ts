import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { cartsProviders } from './carts.providers';
import { databaseProviders } from '../database/database.providers';


describe('Carts Service', () =>
{
	let service: CartsService;
	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [CartsService, ...cartsProviders, ...databaseProviders],
		}).compile();

		service = module.get<CartsService>(CartsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
