import { carts_crt } from './carts.entity';


export const cartsProviders = [
	{
    	provide: 'CARTS_REPOSITORY',
    	useValue: carts_crt,
	},
];
