import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { customersProviders } from './customers.providers';
import { databaseProviders } from '../database/database.providers';


describe('Customers Service', () =>
{
	let service: CustomersService;

	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [CustomersService, ...customersProviders, ...databaseProviders],
		}).compile();

		service = module.get<CustomersService>(CustomersService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
