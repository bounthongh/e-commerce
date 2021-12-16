import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { databaseProviders } from '../database/database.providers';


describe('UsersService', () =>
{
	
	beforeEach(async () =>
	{
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, ...usersProviders, ...databaseProviders],
		}).compile();

		usersService = module.get<UsersService>(UsersService);
	});
});
