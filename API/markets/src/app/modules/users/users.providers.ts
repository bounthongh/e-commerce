import { users_usr } from './users.entity';


export const usersProviders = [
	{
		provide: 'USERS_REPOSITORY',
		useValue: users_usr,
	},
];
