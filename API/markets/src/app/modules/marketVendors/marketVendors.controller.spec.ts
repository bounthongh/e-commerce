import { Test, TestingModule } from '@nestjs/testing';
import { MarketVendorsController } from './marketVendors.controller';
import { MarketVendorsService } from './marketVendors.service';
import { marketVendorsProviders } from './marketVendors.providers';
import { databaseProviders } from '../database/database.providers';


describe('MarketVendors Controller', () =>
{
	let controller: MarketVendorsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [MarketVendorsController],
			providers: [MarketVendorsService, ...marketVendorsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<MarketVendorsController>(MarketVendorsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
