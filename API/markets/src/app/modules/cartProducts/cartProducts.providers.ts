import { carts_x_products_cxp } from './cartProducts.entity';


export const cartProductsProviders = [
	{
    	provide: 'CARTPRODUCTS_REPOSITORY',
    	useValue: carts_x_products_cxp,
	},
];
