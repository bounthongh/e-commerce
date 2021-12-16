import { Test, TestingModule } from '@nestjs/testing';
import { databaseProviders } from '../database/database.providers';
import { bookingsProviders } from './bookings.providers';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';

describe('Bookings Controller', () =>
{
	let controller: BookingsController;


	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
  			controllers: [BookingsController],
			providers: [BookingsService, ...bookingsProviders, ...databaseProviders],
		}).compile();

		controller = module.get<BookingsController>(BookingsController);
	});


	it('should be defined', () =>
	{
		expect(controller).toBeDefined();
	});
});
