import { Test, TestingModule } from '@nestjs/testing';
import { MarketsService } from './markets.service';
import { marketsProviders } from './markets.providers';
import { databaseProviders } from '../database/database.providers';


describe('Markets Service', () =>
{
	let service: MarketsService;
	beforeEach(async () =>
	{
		
		const module: TestingModule = await Test.createTestingModule({
  			providers: [MarketsService, ...marketsProviders, ...databaseProviders],
		}).compile();

		service = module.get<MarketsService>(MarketsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
