import { Test, TestingModule } from '@nestjs/testing';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { vendorsProviders } from './vendors.providers';
import { databaseProviders } from '../database/database.providers';


describe('Markets Controller', () =>
{
	let controller: VendorsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [VendorsController],
			providers: [VendorsService, ...vendorsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<VendorsController>(VendorsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
