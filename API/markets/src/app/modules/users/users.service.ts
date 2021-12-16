import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VendorsService } from '../vendors/vendors.service';
import { MarketVendorsService } from '../marketVendors/marketVendors.service';
import { CustomersService } from '../customers/customers.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from "./dto/update-user.dto";
import { users_usr } from './users.entity';
import { customers_cus } from '../customers/customers.entity';
import { vendors_vdr } from '../vendors/vendors.entity';


@Injectable()
export class UsersService
{

	private readonly users: users_usr[] = [];


	constructor(
		@Inject('USERS_REPOSITORY')
		private readonly usersRepository: typeof users_usr,
		private vendorsService: VendorsService,
		private marketVendorsService: MarketVendorsService,
		private customersService: CustomersService,
	) {}


	async create(createUserDto: CreateUserDto): Promise<users_usr>
	{
		if ((createUserDto.USR_IS_CUSTOMER && createUserDto.USR_IS_VENDOR) ||
			(!createUserDto.MARKET_IDS[0] || isNaN(createUserDto.MARKET_IDS[0])))
		{
			throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
		}

		const user = await users_usr.create({
			USR_IS_ADMIN: createUserDto.USR_IS_ADMIN,
			USR_LOGIN: createUserDto.USR_LOGIN,
			USR_PASSWORD: bcrypt.hashSync(createUserDto.USR_PASSWORD, 10),
			USR_FIRST_NAME: createUserDto.USR_FIRST_NAME,
			USR_LAST_NAME: createUserDto.USR_LAST_NAME,
			USR_ADDRESS: createUserDto.USR_ADDRESS,
			USR_ZIP_CODE: createUserDto.USR_ZIP_CODE,
			USR_CITY: createUserDto.USR_CITY,
			USR_PHONE_NUMBER: createUserDto.USR_PHONE_NUMBER,
		});

		if (createUserDto.USR_IS_CUSTOMER)
		{
			this.customersService.create({
				USR_ID: user.USR_ID,
				MKT_ID: createUserDto.MARKET_IDS[0],
			});
		}
		else if (createUserDto.USR_IS_VENDOR)
		{
			this.vendorsService.create({
				USR_ID: user.USR_ID,
				VDR_NAME: createUserDto.VDR_NAME,
			}).then((vendor) =>
			{
				createUserDto.MARKET_IDS.forEach((marketId) => {
					this.marketVendorsService.create({
						MKT_ID: marketId,
						VDR_ID: vendor.VDR_ID,
					});
				});
			});
		}

		return user;
	}


	async findAll(): Promise<users_usr[]>
	{
		const users = await this.usersRepository.findAll<users_usr>({
			include: [
				{ model: customers_cus },
				{ model: vendors_vdr },
			],
		}) || [];

		const cleanUsers = users.map((user) =>
		{
			const { USR_PASSWORD, ...cleanUser } = user.dataValues;
			return cleanUser;
		});

		return cleanUsers;
	}


	async findOne(idUser: number): Promise<users_usr>
	{
		const user = await this.usersRepository.findOne<users_usr>({
			where: { USR_ID: idUser },
			include: [
				{ model: customers_cus },
				{ model: vendors_vdr },
			],
		});
		const { USR_PASSWORD, ...cleanUser } = user.dataValues;

		return cleanUser;
	}


	async deleteOne(idUser: number)
	{
		return this.usersRepository.destroy({
			where: { USR_ID: idUser },
		});
	}


	async findOneByLogin(login: string): Promise<users_usr>
	{
		return this.usersRepository.findOne<users_usr>({
			where: { USR_LOGIN: login },
			include: [
				{ model: customers_cus },
				{ model: vendors_vdr },
			],
		});
	}


	async update(updateUserDto: UpdateUserDto)
	{
		let user = await this.usersRepository.findByPk(updateUserDto.USR_ID);

		if (!user)
		{
			throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
		}

		user = await user.update({
			USR_ID: updateUserDto.USR_ID,
			USR_IS_ADMIN: updateUserDto.USR_IS_ADMIN,
			USR_LOGIN: updateUserDto.USR_LOGIN,
			USR_PASSWORD: bcrypt.hashSync(updateUserDto.USR_PASSWORD, 10),
			USR_FIRST_NAME: updateUserDto.USR_FIRST_NAME,
			USR_LAST_NAME: updateUserDto.USR_LAST_NAME,
			USR_ADDRESS: updateUserDto.USR_ADDRESS,
			USR_ZIP_CODE: updateUserDto.USR_ZIP_CODE,
			USR_CITY: updateUserDto.USR_CITY,
			USR_PHONE_NUMBER: updateUserDto.USR_PHONE_NUMBER
		});

		return user;
	}
}
