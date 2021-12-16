import { customers_cus } from './customers.entity';


export const customersProviders = [
	{
    	provide: 'CUSTOMERS_REPOSITORY',
    	useValue: customers_cus,
	},
];
