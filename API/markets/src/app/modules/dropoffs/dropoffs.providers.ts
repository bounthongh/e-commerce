import { dropoff_drp } from './dropoffs.entity';


export const dropoffsProviders = [
	{
    	provide: 'DROPOFFS_REPOSITORY',
    	useValue: dropoff_drp,
	},
];
