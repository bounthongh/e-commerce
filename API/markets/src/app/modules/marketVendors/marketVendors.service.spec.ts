import { Test, TestingModule } from '@nestjs/testing';
import { MarketVendorsService } from './marketVendors.service';
import { marketVendorsProviders } from './marketVendors.providers';
import { databaseProviders } from '../database/database.providers';


describe('MarketVendors Service', () =>
{
	let service: MarketVendorsService;
	beforeEach(async () =>
	{

		const module: TestingModule = await Test.createTestingModule({
  			providers: [MarketVendorsService, ...marketVendorsProviders, ...databaseProviders],
		}).compile();

		service = module.get<MarketVendorsService>(MarketVendorsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
