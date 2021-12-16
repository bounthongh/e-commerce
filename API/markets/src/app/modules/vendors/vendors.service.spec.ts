import { Test, TestingModule } from '@nestjs/testing';
import { VendorsService } from './vendors.service';
import { vendorsProviders } from './vendors.providers';
import { databaseProviders } from '../database/database.providers';

describe('Vendors Service', () =>
{
	let service: VendorsService;
	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [VendorsService, ...vendorsProviders, ...databaseProviders],
		}).compile();

		service = module.get<VendorsService>(VendorsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
