import { products_pdt } from './products.entity';


export const productsProviders = [
	{
    	provide: 'PRODUCTS_REPOSITORY',
    	useValue: products_pdt,
	},
];
