import { Sequelize } from 'sequelize-typescript';

import { markets_mkt } from '../markets/markets.entity';
import { vendors_vdr } from './../vendors/vendors.entity';
import { markets_x_vendors_mxv } from './../marketVendors/marketVendors.entity';
import { customers_cus } from './../customers/customers.entity';
import { products_pdt } from './../products/products.entity';
import { users_usr } from '../users/users.entity';
import { carts_crt } from '../carts/carts.entity';
import { carts_x_products_cxp } from '../cartProducts/cartProducts.entity';
import { bookings_bkg } from '../bookings/bookings.entity';
import { dropoff_drp } from '../dropoffs/dropoffs.entity';


export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: 'mysql',
				host: process.env.DATABASE_URL || 'localhost' ,
				port:  3306,
				username: 'root',
				password: '',
				database: 'markets',
				logging: false,
			});

			sequelize.addModels([
				markets_mkt,
				vendors_vdr,
				markets_x_vendors_mxv,
				customers_cus,
				products_pdt,
				users_usr,
				carts_crt,
				carts_x_products_cxp,
				bookings_bkg,
				dropoff_drp,
			]);

			return sequelize;
		},
	},
];
