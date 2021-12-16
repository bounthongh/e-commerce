import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { bookingsProviders } from './bookings.providers';
import { databaseProviders } from '../database/database.providers';


describe('Bookings Service', () =>
{
	let service: BookingsService;
	beforeEach(async () =>
	{
		
		const module: TestingModule = await Test.createTestingModule({
  			providers: [BookingsService, ...bookingsProviders, ...databaseProviders],
		}).compile();

		service = module.get<BookingsService>(BookingsService);
	});


	it('should be defined', () =>
	{
		expect(service).toBeDefined();
	});
});
