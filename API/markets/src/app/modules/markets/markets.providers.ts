import { markets_mkt } from './markets.entity';


export const marketsProviders = [
	{
    	provide: 'MARKETS_REPOSITORY',
    	useValue: markets_mkt,
	},
];
