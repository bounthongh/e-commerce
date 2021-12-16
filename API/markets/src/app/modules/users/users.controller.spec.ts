import { Test, TestingModule } from '@nestjs/testing';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { databaseProviders } from '../database/database.providers';


describe('Users Controller', () =>
{
	let usersController: UsersController;


	beforeEach(async () =>
	{
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService, ...usersProviders, ...databaseProviders],
		}).compile();

		usersController = moduleRef.get<UsersController>(UsersController);
	});


	it('should be defined', () =>
	{
		expect(usersController).toBeDefined();
	});

});
