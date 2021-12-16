import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { bookingsProviders } from './bookings.providers';

@Module({
	controllers: [BookingsController],
	providers: [BookingsService, ...bookingsProviders],
})

export class BookingsModule {}
