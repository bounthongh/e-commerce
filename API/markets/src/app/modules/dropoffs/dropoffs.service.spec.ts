import { Test, TestingModule } from '@nestjs/testing';
import { DropoffsService } from './dropoffs.service';
import { dropoffsProviders } from './dropoffs.providers';
import { databaseProviders } from '../database/database.providers';


describe('Dropoffs Service', () =>
{
	let service: DropoffsService;
	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			providers: [DropoffsService, ...dropoffsProviders, ...databaseProviders],
		}).compile();

		service = module.get<DropoffsService>(DropoffsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
