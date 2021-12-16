import { vendors_vdr } from './vendors.entity';


export const vendorsProviders = [
	{
    	provide: 'VENDOR_REPOSITORY',
    	useValue: vendors_vdr,
	},
];
