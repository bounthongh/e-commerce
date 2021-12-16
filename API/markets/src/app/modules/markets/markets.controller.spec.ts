import { Test, TestingModule } from '@nestjs/testing';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';
import { marketsProviders } from './markets.providers';
import { databaseProviders } from '../database/database.providers';


describe('Markets Controller', () =>
{
	let controller: MarketsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [MarketsController],
			providers: [MarketsService, ...marketsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<MarketsController>(MarketsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
