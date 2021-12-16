import { Test, TestingModule } from '@nestjs/testing';
import { DropoffsController } from './dropoffs.controller';
import { DropoffsService } from './dropoffs.service';
import { dropoffsProviders } from './dropoffs.providers';
import { databaseProviders } from '../database/database.providers';


describe('Dropoffs Controller', () =>
{
	let controller: DropoffsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [DropoffsController],
			providers: [DropoffsService, ...dropoffsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<DropoffsController>(DropoffsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
