import { bookings_bkg } from './bookings.entity';

export const bookingsProviders = [
	{
    	provide: 'BOOKINGS_REPOSITORY',
    	useValue: bookings_bkg,
	},
];
