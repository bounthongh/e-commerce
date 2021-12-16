import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './vendors.controller';
import { CustomersService } from './vendors.service';
import { vendorsProviders } from './vendors.providers';
import { databaseProviders } from '../database/database.providers';


describe('Customers Controller', () =>
{
	let controller: CustomersController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [CustomersController],
			providers: [CustomersService, ...vendorsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<CustomersController>(CustomersController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
