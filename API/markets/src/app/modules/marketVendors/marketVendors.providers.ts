import { markets_x_vendors_mxv } from './marketVendors.entity';


export const marketVendorsProviders = [
	{
    	provide: 'MARKETVENDORS_REPOSITORY',
    	useValue: markets_x_vendors_mxv,
	},
];
