import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { cartsProviders } from './carts.providers';
import { databaseProviders } from '../database/database.providers';


describe('Carts Controller', () =>
{
	let controller: CartsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [CartsController],
			providers: [CartsService, ...cartsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<CartsController>(CartsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
